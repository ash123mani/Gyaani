import { QuizRoomService } from '@/src/quiz/quiz-room.service';
import { Server, Socket } from 'socket.io';
import { CreateQuizRoomEventData, JoinQuizRoomEventData } from '@qj/shared/dist/types';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class QuizRoomManagerService {
  public server: Server;
  private readonly quizRooms: Map<QuizRoomService['id'], QuizRoomService> = new Map<
    QuizRoomService['id'],
    QuizRoomService
  >();

  public createQuizRoom(createQuizRoomEventData: CreateQuizRoomEventData): QuizRoomService {
    if (this.quizRooms.has(createQuizRoomEventData.quizRoomId)) {
      throw new WsException({
        code: 'QUIZ_ROOM_ALREADY_EXISTS',
        message: 'QuizRoom already exists',
        details: 'Seems like this Quiz Room has been occupied already',
        timestamp: Date.now(),
      });
    }

    const quizRoom = new QuizRoomService(this.server, createQuizRoomEventData.maxPlayersAllowed);
    this.quizRooms.set(createQuizRoomEventData.quizRoomId, quizRoom);

    return quizRoom;
  }

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData): QuizRoomService {
    const quizRoom = this.quizRooms.get(data.quizRoomId);

    if (!quizRoom) {
      throw new WsException({
        code: 'QUIZ_ROOM_NOT_FOUND',
        message: 'No such quiz room exist',
        details: 'Try creating a new room',
        timestamp: Date.now(),
      });
    }

    if (quizRoom.players.size === quizRoom.maxPlayersAllowed) {
      throw new WsException({
        code: 'QUIZ_ROOM_ALREADY_FULL',
        message: 'Quiz room is already full',
        details: 'Try joining new room',
        timestamp: Date.now(),
      });
    }

    quizRoom.addPlayerToQuizRoom(player, data);

    return quizRoom;
  }
}
