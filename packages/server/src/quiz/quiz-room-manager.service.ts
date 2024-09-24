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
    const quizRoom = new QuizRoomService(this.server, createQuizRoomEventData.maxPlayersAllowed);
    this.quizRooms.set(createQuizRoomEventData.quizRoomId, quizRoom);

    return quizRoom;
  }

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData): QuizRoomService {
    const quizRoom = this.quizRooms.get(data.quizRoomId);

    if (!quizRoom) {
      throw new WsException('No Quiz Rooms Found');
    }

    if (quizRoom.players.size === quizRoom.maxPlayersAllowed) {
      throw new WsException('Lobby Full');
    }

    quizRoom.addPlayerToQuizRoom(player, data);

    return quizRoom;
  }
}
