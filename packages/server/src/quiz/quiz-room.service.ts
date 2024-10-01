import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { QuizGame } from '@/src/quiz/quiz-game.service';
import { JoinQuizRoomEventData, QuizRoomState, QuizRoomServerToClientEvents } from '@qj/shared';
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

  constructor(
    private readonly server: Server,
    public readonly maxPlayersAllowed: number = 1,
  ) {}

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData) {
    this.players.set(player.id, player);
    this.usersNames.set(player.id, data.userName);
    player.join(this.roomId);
  }

  public removePlayerFromQuizRoom(player: Socket) {
    player.leave(this.roomId);
    this.usersNames.delete(player.id);
  }

  public startQuizGame() {
    if (this.players.size === this.maxPlayersAllowed) {
      this.quizGame.startGame();
    }
  }

  public endQuizGame() {
    this.quizGame.endGame();
  }

  public get state(): QuizRoomState {
    return {
      users: mapToArrayValues(this.usersNames),
      roomId: this.roomId,
      hasAllPlayersJoined: this.hasAllPlayersJoined,
      quizGame: {
        hasStarted: this.quizGame.hasStarted,
        currentQues: this.quizGame.currentQues,
        hasFinished: this.quizGame.hasFinished,
        hasNextQues: this.quizGame.hasNextQues,
      },
    };
  }

  public dispatchEventToQuizRoom<T>(event: QuizRoomServerToClientEvents, payload: T) {
    this.server.to(this.roomId).emit(event, payload);
  }

  public get hasAllPlayersJoined() {
    return this.players.size === this.maxPlayersAllowed;
  }

  private sendQues() {
    if (this.queue.length > 0) {
      // TODO: Clear timeout after need

      setTimeout(() => {
        if (!this.quizGame.hasStarted) {
          this.startQuizGame();
          this.dispatchEventToQuizRoom<QuizRoomState>('QuizGameStarted', this.state);
        }
        this.dispatchEventToQuizRoom<QuizRoomState>('NewQuizQuestion', this.state);
        this.quizGame.moveToNextQues();

        this.queue.shift();
        this.sendQues();
      }, 5000);
    } else {
      setTimeout(() => {
        this.notRunning = true;
        this.quizGame.endGame();
        this.dispatchEventToQuizRoom<QuizRoomState>('QuizGameEnded', this.state);
      }, 5000);
    }
  }

  public startSendingQues(): void {
    if (this.notRunning) {
      this.notRunning = false;
      this.sendQues();
    }
  }
}
