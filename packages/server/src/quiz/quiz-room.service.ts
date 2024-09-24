import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { QuizGame } from '@/src/quiz/quiz-game.service';
import { JoinQuizRoomEventData, QuizRoomServerToClientEvents } from '@qj/shared/dist/types';

export class QuizRoomService {
  public readonly id: string = uuidv4();
  public readonly createdAt: Date = new Date();
  public readonly players: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();
  public readonly quizGame: QuizGame = new QuizGame(this);
  public readonly usersNames: string[] = [];

  constructor(
    private readonly server: Server,
    public readonly maxPlayersAllowed: number = 1,
  ) {}

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData) {
    this.players.set(player.id, player);
    this.usersNames.push(data.userName);
    player.join(this.id);
  }

  public dispatchEventToQuizRoom<T>(event: QuizRoomServerToClientEvents, payload: T) {
    this.server.to(this.id).emit(event, payload);
  }
}
