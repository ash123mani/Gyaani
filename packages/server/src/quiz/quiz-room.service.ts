import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { QuizGame } from '@/src/quiz/quiz-game.service';
import { JoinQuizRoomEventData, QuizRoomServerToClientEvents } from '@qj/shared/dist/types';

// TODO: Name it properly and read https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/ before refactoring
export class QuizRoomService {
  public readonly roomId: string = uuidv4();
  public readonly createdAt: Date = new Date();
  public readonly players: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();
  public readonly quizGame: QuizGame = new QuizGame(this);
  public readonly usersNames: Map<Socket['id'], string> = new Map();

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

  public dispatchEventToQuizRoom<T>(event: QuizRoomServerToClientEvents, payload: T) {
    this.server.to(this.roomId).emit(event, payload);
  }
}
