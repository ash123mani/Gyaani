import { QuizRoom } from '@/src/quiz/quiz-room';
import { Server, Socket } from 'socket.io';
import { ContentfulQuizQuestionContentModelType } from '@qj/shared';
import { Injectable } from '@nestjs/common';
import { WebSocketServer, WsException } from '@nestjs/websockets';
import {
  ERRORS,
  ContentfulQuizGameContentModelType,
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  User,
} from '@qj/shared';
import { UserService } from '@/src/user/user.service';

@Injectable()
export class QuizRoomManagerService {
  @WebSocketServer()
  private readonly io!: Server;

  private readonly quizRooms: Map<QuizRoom['roomId'], QuizRoom> = new Map();
  private readonly quizRoomHosts: Map<QuizRoom['roomId'], Socket> = new Map();

  constructor(private userService: UserService) {}

  public addUser(user: User) {
    this.userService.addUser(user);
  }

  public terminateSocket(player: Socket): void {
    const playerQuizRoom = this.getPlayerQuizRoom(player);
    playerQuizRoom?.removePlayerFromQuizRoom(player.id, player);
  }

  public createQuizRoom(
    player: Socket,
    createQuizRoomEventData: CreateQuizRoomEventData,
    quizRoomConfig: ContentfulQuizGameContentModelType,
    quizQuestions: ContentfulQuizQuestionContentModelType[],
  ): QuizRoom {
    const quizRoom = new QuizRoom(this.io, quizRoomConfig, quizQuestions, createQuizRoomEventData.maxPlayersAllowed);
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

  public playAgain(currentRoomId: string, quizGameId: string) {
    const currentRoomHost = this.quizRoomHosts.get(currentRoomId);
    const currentQuizRoom = this.quizRooms.get(currentRoomId);

    const newQuizRoom = this.createQuizRoom(
      currentRoomHost,
      {
        userName: currentQuizRoom.usersNames.get(currentRoomHost.id),
        maxPlayersAllowed: currentQuizRoom.players.size,
        quizGameId: quizGameId,
      },
      currentQuizRoom.quizRoomConfig,
      currentQuizRoom.quizQuestions,
    );

    for (const [playerSocketId, playerSocket] of currentQuizRoom.players) {
      this.addPlayerToQuizRoom(playerSocket, {
        quizRoomId: newQuizRoom.roomId,
        userName: currentQuizRoom.usersNames.get(playerSocketId),
      });

      currentQuizRoom.removePlayerFromQuizRoom(playerSocket.id, playerSocket);
    }

    this.quizRooms.delete(currentRoomId);
    this.quizRoomHosts.delete(currentRoomId);

    return newQuizRoom;
  }
}
