import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';
import { QuizRoomClientToServerEvent, QuizRoomServerToClientEvents } from '@qj/shared';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QuizGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(QuizGateway.name);

  @WebSocketServer() io: Server;

  constructor(private readonly quizService: QuizService) {}

  afterInit() {
    this.logger.log('Server is running');
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

  @SubscribeMessage<QuizRoomClientToServerEvent>('CreateQuizRoom')
  handleMessage(client: Socket, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);

    client.emit<QuizRoomServerToClientEvents>('SuccessfullyCreatedQuizRoom', data);
    return 'pong';
  }
}
