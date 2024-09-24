import { QuizRoomService } from '@/src/quiz/quiz-room.service';
import { Server, Socket } from 'socket.io';
import {
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  QuizRoomServerErrors,
  ServerExceptionResponse,
} from '@qj/shared/dist/types';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export class ServerException extends WsException {
  constructor(type: QuizRoomServerErrors, message?: string | object) {
    const serverExceptionResponse: ServerExceptionResponse = {
      exception: type,
      message: message,
    };
    super(serverExceptionResponse);
  }
}

@Injectable()
export class QuizRoomManagerService {
  public server: Server;
  private readonly lobbies: Map<QuizRoomService['id'], QuizRoomService> = new Map<
    QuizRoomService['id'],
    QuizRoomService
  >();

  public createQuizRoom(createQuizRoomEventData: CreateQuizRoomEventData): QuizRoomService {
    const quizRoom = new QuizRoomService(this.server, createQuizRoomEventData.maxPlayersAllowed);
    this.lobbies.set(createQuizRoomEventData.quizRoomId, quizRoom);

    return quizRoom;
  }

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData): QuizRoomService {
    const quizRoom = this.lobbies.get(data.quizRoomId);

    if (!quizRoom) {
      throw new ServerException(QuizRoomServerErrors.NoQuizRoomFound, 'No Quiz Rooms Found');
    }

    if (quizRoom.players.size === quizRoom.maxPlayersAllowed) {
      throw new ServerException(QuizRoomServerErrors.LobbyFull, 'Lobby Full');
    }

    quizRoom.addPlayerToQuizRoom(player, data);

    return quizRoom;
  }
}
