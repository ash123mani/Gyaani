import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CreateQuizRoomEventData, JoinQuizRoomEventData, QuizRoomClientToServerEvent } from '@qj/shared';
import { QuizRoomManagerService } from '@/src/quiz/quiz-room-manager.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QuizGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(QuizGateway.name);

  @WebSocketServer() io: Server;

  constructor(private readonly quizRoomManager: QuizRoomManagerService) {}

  afterInit(server: Server) {
    this.quizRoomManager.server = server;
    this.logger.log('Quiz Room Server is running');
  }

  handleConnection(client: Socket) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id:${client.id} disconnected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  // TODO: This should fail with proper error message when CreateQuizRoomEventData is not in proper format (use zod validation pipe)
  @SubscribeMessage<QuizRoomClientToServerEvent>('CreateQuizRoom')
  handleCreateQuizRoomEvent(@MessageBody() data: CreateQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`CreateQuizRoom event received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${typeof data}`);

    const quizRoom = this.quizRoomManager.createQuizRoom(data);
    quizRoom.addPlayerToQuizRoom(client, data);
    // TODO: Define the payload data types for different events
    quizRoom.dispatchEventToQuizRoom('SuccessfullyCreatedQuizRoom', {
      users: quizRoom.usersNames,
    });

    if (quizRoom.players.size === quizRoom.maxPlayersAllowed) {
      quizRoom.quizGame.startQuizGame();
      quizRoom.dispatchEventToQuizRoom<(typeof quizRoom.quizGame.quizQues)[0]>('StartedQuizGame', {
        quiz: quizRoom.quizGame.quizQues,
      });
    }

    this.logger.log(
      `QuizRoom: ${quizRoom.id} have maxAllowed players: ${data.maxPlayersAllowed} and currently ${quizRoom.players.size} Players have joined`,
    );
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('JoinQuizRoom')
  handleJoinQuizRoomEvent(@MessageBody() data: JoinQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`CreateQuizRoom event received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${typeof data}`);

    const quizRoom = this.quizRoomManager.addPlayerToQuizRoom(client, data);

    quizRoom.dispatchEventToQuizRoom('SuccessfullyJoinedQuizRoom', {
      users: quizRoom.usersNames,
    });

    if (quizRoom.players.size === quizRoom.maxPlayersAllowed) {
      quizRoom.quizGame.startQuizGame();
      quizRoom.dispatchEventToQuizRoom<(typeof quizRoom.quizGame.quizQues)[0]>('StartedQuizGame', {
        quiz: quizRoom.quizGame.quizQues,
      });
    }
  }
}