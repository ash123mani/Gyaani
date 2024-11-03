import { QuizRoom } from '@/src/quiz/quiz-room';
import { Server, Socket } from 'socket.io';
import { ContentfulQuizQuestionContentModelType } from '@qj/shared';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ERRORS, ContentfulQuizGameContentModelType, CreateQuizRoomEventData, JoinQuizRoomEventData } from '@qj/shared';

@Injectable()
export class QuizRoomManagerService {
  public server: Server;
  private readonly quizRooms: Map<QuizRoom['roomId'], QuizRoom> = new Map();
  private readonly quizRoomHosts: Map<QuizRoom['roomId'], Socket> = new Map();

  public terminateSocket(player: Socket): void {
    const playerQuizRoom = this.getPlayerQuizRoom(player);
    playerQuizRoom?.removePlayerFromQuizRoom(player);
  }

  public createQuizRoom(
    player: Socket,
    createQuizRoomEventData: CreateQuizRoomEventData,
    quizRoomConfig: ContentfulQuizGameContentModelType,
    quizQuestions: ContentfulQuizQuestionContentModelType[],
  ): QuizRoom {
    const quizRoom = new QuizRoom(
      this.server,
      quizRoomConfig,
      quizQuestions,
      createQuizRoomEventData.maxPlayersAllowed,
    );
    quizRoom.host = player;
    this.quizRoomHosts.set(quizRoom.roomId, player);
    this.quizRooms.set(quizRoom.roomId, quizRoom);
    return quizRoom;
  }

  public addPlayerToQuizRoom(player: Socket, data: JoinQuizRoomEventData): QuizRoom {
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
