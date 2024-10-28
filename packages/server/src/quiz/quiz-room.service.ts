import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { QuizGame } from '@/src/quiz/quiz-game.service';
import {
  JoinQuizRoomEventData,
  QuizRoomState,
  QuizRoomServerToClientEvents,
  SelectedAnswerEventData,
  QuizQues,
  QUIZ_QUES_GAP_MILLISECONDS,
  WAIT_TIME_BEFORE_QUIZ_STOP_MILLISECONDS,
} from '@qj/shared';
import { mapToArrayValues } from '@/src/utils/map-to-array';

// TODO: Name it properly and read https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/ before refactoring
export class QuizRoomService {
  public readonly roomId: string = uuidv4();
  public readonly createdAt: Date = new Date();
  public readonly players: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();
  public readonly quizGame: QuizGame = new QuizGame(this);
  public readonly usersNames: Map<Socket['id'], string> = new Map();
  private queue = Array.from(this.quizGame.quizQues);
  private notRunning: boolean = true;
  public hostSocketId: Socket['id'];
  public selectedAns: Map<Socket['id'], Map<QuizQues['id'], number>> = new Map();

  constructor(
    private readonly server: Server,
    public readonly maxPlayersAllowed: number = 1,
  ) {}

  public set host(player: Socket) {
    this.hostSocketId = player.id;
  }

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData) {
    this.players.set(player.id, player);
    this.usersNames.set(player.id, data.userName);
    player.join(this.roomId);
  }

  public removePlayerFromQuizRoom(player: Socket) {
    player.leave(this.roomId);
    this.usersNames.delete(player.id);
    this.players.delete(player.id);
    if (this.hostSocketId === player.id) {
      this.hostSocketId = null;
      // this.quizGame.endGame();
    }
  }

  public startQuizGame() {
    if (this.players.size === this.maxPlayersAllowed) {
      this.quizGame.startGame();
    }
  }

  public updateSelectedAns(player: Socket, data: SelectedAnswerEventData) {
    this.selectedAns.set(player.id, (this.selectedAns.get(player.id) || new Map()).set(data.quesId, data.selectedAns));
  }

  public scores() {
    const scores: QuizRoomState['quizGame']['scores'] = [];
    for (const [playerId] of this.players) {
      let correctQuesCount = 0;
      let inCorrectQuesCount = 0;
      let unAttemptedQuesCount = 0;

      this.quizGame.quizQues.map((ques) => {
        const correctAns = this.quizGame.answers.get(ques.id);
        const selectedAns = (this.selectedAns.get(playerId) || new Map()).get(ques.id);

        if (!selectedAns) {
          unAttemptedQuesCount = unAttemptedQuesCount + 1;
        } else if (correctAns === selectedAns) {
          correctQuesCount = correctQuesCount + 1;
        } else {
          inCorrectQuesCount = inCorrectQuesCount + 1;
        }
      });

      const scorePayload: QuizRoomState['quizGame']['scores'][0] = {
        playerName: this.usersNames.get(playerId),
        playerId: playerId,
        correctQuesCount: correctQuesCount,
        inCorrectQuesCount: inCorrectQuesCount,
        unAttemptedQuesCount: unAttemptedQuesCount,
        score: correctQuesCount * 10,
      };
      scores.push(scorePayload);
    }

    return scores;
  }

  public get state(): QuizRoomState {
    return {
      users: mapToArrayValues(this.usersNames),
      roomId: this.roomId,
      hasAllPlayersJoined: this.hasAllPlayersJoined,
      hostSocketId: this.hostSocketId,
      quizGame: {
        hasStarted: this.quizGame.hasStarted,
        currentQues: this.quizGame.currentQues,
        hasFinished: this.quizGame.hasFinished,
        hasNextQues: this.quizGame.hasNextQues,
        scores: this.scores(),
        totalScore: this.quizGame.quizQues.length * 10,
      },
    };
  }

  public dispatchEventToQuizRoom<T>(event: QuizRoomServerToClientEvents, payload: T) {
    this.server.to(this.roomId).emit(event, payload);
  }

  public get hasAllPlayersJoined() {
    return this.players.size === this.maxPlayersAllowed;
  }

  private sendQues(player: Socket) {
    if (this.queue.length > 0) {
      // TODO: Clear timeout after need

      const gap = this.quizGame.hasStarted ? QUIZ_QUES_GAP_MILLISECONDS : WAIT_TIME_BEFORE_QUIZ_STOP_MILLISECONDS;

      setTimeout(() => {
        if (!this.quizGame.hasStarted) {
          this.startQuizGame();
        }
        this.dispatchEventToQuizRoom<QuizRoomState>('QuizRoomState', this.state);
        this.quizGame.moveToNextQues();

        this.queue.shift();
        this.sendQues(player);
      }, gap);
    } else {
      setTimeout(() => {
        this.notRunning = true;
        this.quizGame.endGame();
        this.dispatchEventToQuizRoom<QuizRoomState>('QuizRoomState', this.state);
        this.removePlayerFromQuizRoom(player);
      }, QUIZ_QUES_GAP_MILLISECONDS);
    }
  }

  public startSendingQues(player: Socket): void {
    if (this.notRunning) {
      this.notRunning = false;
      this.sendQues(player);
    }
  }
}
