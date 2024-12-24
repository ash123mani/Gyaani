import { Server, Socket } from 'socket.io';
import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import {
  ERRORS,
  ContentfulQuizGameContentModelType,
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  User,
  ContentfulQuizQuestionContentModelType,
} from '@qj/shared';
import { UserService } from '@/src/modules/user/user.service';
import { QuizRoomService } from '@/src/modules/quiz-game-gateway/quiz-room/quiz-room.service';

@Injectable()
export class QuizRoomManagerService {
  public server: Server | undefined;
  private readonly logger = new Logger(QuizRoomManagerService.name);

  private readonly quizRooms: Map<QuizRoomService['roomId'], QuizRoomService> = new Map();
  private readonly quizRoomHosts: Map<QuizRoomService['roomId'], Socket> = new Map();
  private readonly newQuizRooms: Map<QuizRoomService['roomId'], QuizRoomService> = new Map();

  constructor(private userService: UserService) {}

  public addUser(user: User) {
    this.userService.addUser(user);
  }

  public terminateSocket(player: Socket): void {
    try {
      const playerQuizRoom = this.getPlayerQuizRoom(player);
      playerQuizRoom?.removePlayerFromQuizRoom(player.id, player);
    } catch {
      this.logger.error('Error While terminating the socket');
    }
  }

  public createQuizRoom(
    player: Socket,
    createQuizRoomEventData: CreateQuizRoomEventData,
    quizRoomConfig: ContentfulQuizGameContentModelType,
    quizQuestions: ContentfulQuizQuestionContentModelType[],
  ): QuizRoomService {
    const quizRoom = new QuizRoomService(
      this.server!,
      quizRoomConfig,
      quizQuestions,
      createQuizRoomEventData.maxPlayersAllowed,
    );
    quizRoom.host = player;

    this.quizRoomHosts.set(quizRoom.roomId, player);
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

    throw new NotFoundException({
      title: 'User Not Found',
      status: HttpStatus.NOT_FOUND,
      detail: `User with id '${player.id}' was not found`,
    });
  }

  // here new host will the one who requested the playAgain
  public playAgain(currentRoomId: string, quizGameId: string) {
    const currentRoomHost = this.quizRoomHosts.get(currentRoomId) || this.quizRoomHosts.values()[0]; // this should be handled by method inside QuizRoom
    const currentQuizRoom = this.quizRooms.get(currentRoomId);

    if (!currentQuizRoom) {
      throw new NotFoundException({
        title: 'User Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: `QuizRoom with id '${currentRoomId}' was not found`,
      });
    }

    const newQuizRoom = this.createQuizRoom(
      currentRoomHost,
      {
        userName: currentQuizRoom.usersNames.get(currentRoomHost.id)!,
        maxPlayersAllowed: currentQuizRoom.players.size,
        quizGameId: quizGameId,
      },
      currentQuizRoom.quizRoomConfig,
      currentQuizRoom.quizQuestions,
    );

    for (const [playerSocketId, playerSocket] of currentQuizRoom.players) {
      this.addPlayerToQuizRoom(playerSocket, {
        quizRoomId: newQuizRoom.roomId,
        userName: currentQuizRoom.usersNames.get(playerSocketId)!,
      });

      currentQuizRoom.removePlayerFromQuizRoom(playerSocket.id, playerSocket);
    }

    this.quizRooms.delete(currentRoomId);
    this.quizRoomHosts.delete(currentRoomId);

    return newQuizRoom;
  }
}
