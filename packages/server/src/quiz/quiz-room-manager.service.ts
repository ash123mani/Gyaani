import { QuizRoomService } from '@/src/quiz/quiz-room.service';
import { Server, Socket } from 'socket.io';
import { CreateQuizRoomEventData, JoinQuizRoomEventData } from '@qj/shared/dist/types';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ERRORS } from '@qj/shared';

@Injectable()
export class QuizRoomManagerService {
  public server: Server;
  private readonly quizRooms: Map<QuizRoomService['roomId'], QuizRoomService> = new Map();

  public terminateSocket(player: Socket): void {
    const playerQuizRoom = this.getPlayerQuizRoom(player);
    playerQuizRoom.removePlayerFromQuizRoom(player);
  }

  public createQuizRoom(createQuizRoomEventData: CreateQuizRoomEventData): QuizRoomService {
    const quizRoom = new QuizRoomService(this.server, createQuizRoomEventData.maxPlayersAllowed);
    this.quizRooms.set(quizRoom.roomId, quizRoom);

    return quizRoom;
  }

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData): QuizRoomService {
    const quizRoom = this.quizRooms.get(data.quizRoomId);

    if (!quizRoom) throw new WsException(ERRORS.QUIZ_ROOM_NOT_FOUND);
    if (quizRoom.players.size === quizRoom.maxPlayersAllowed) throw new WsException(ERRORS.QUIZ_ROOM_ALREADY_FULL);

    quizRoom.addPlayerToQuizRoom(player, data);

    return quizRoom;
  }

  public getPlayerQuizRoom(player: Socket) {
    const quizRooms = this.quizRooms.values();
    for (const quizRoom of quizRooms) {
      if (quizRoom.players.has(player.id)) {
        return quizRoom;
      }
    }
  }
}
