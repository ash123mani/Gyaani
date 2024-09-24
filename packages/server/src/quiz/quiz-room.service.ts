import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { QuizGame } from '@/src/quiz/quiz-game.service';
import { CreateQuizRoomEventData, QuizRoomServerToClientEvents } from '@qj/shared/dist/types';

export class QuizRoomService {
  public readonly id: string = uuidv4();
  public readonly createdAt: Date = new Date();
  public readonly clients: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();
  public readonly quizGame: QuizGame = new QuizGame(this);
  public readonly users: string[] = [];

  constructor(
    private readonly server: Server,
    public readonly maxAllowedPlayers: number = 1,
  ) {}

  public addPlayerToQuizRoom(client: Socket, data: CreateQuizRoomEventData) {
    this.clients.set(client.id, client);
    this.users.push(data.userName);
    this.server.socketsJoin(this.id);
  }

  public dispatchEventToQuizRoom<T>(event: QuizRoomServerToClientEvents, payload: T) {
    this.server.to(this.id).emit(event, payload);
  }
}
