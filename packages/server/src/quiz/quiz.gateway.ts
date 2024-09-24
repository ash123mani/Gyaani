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
import { CreateQuizRoomEventData, QuizRoomClientToServerEvent } from '@qj/shared';
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
  handleMessage(@MessageBody() data: CreateQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`CreateQuizRoom event received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${typeof data}`);

    const quizRoom = this.quizRoomManager.createQuizRoom(data);
    quizRoom.addPlayerToQuizRoom(client, data);
    // TODO: Define the payload data types for different events
    quizRoom.dispatchEventToQuizRoom('SuccessfullyCreatedQuizRoom', {
      users: quizRoom.users,
    });

    if (quizRoom.clients.size === data.maxPlayersAllowed) quizRoom.quizGame.startQuizGame();

    this.logger.log(
      `QuizRoom: ${quizRoom.id} have maxAllowed players: ${data.maxPlayersAllowed} and currently ${quizRoom.clients.size} Players have joined`,
    );
  }
}
