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
import { Logger, UseFilters } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  QuizRoomClientToServerEvent,
  QuizRoomState,
  SelectedAnswerEventData,
} from '@qj/shared';
import { QuizRoomManagerService } from '@/src/quiz/quiz-room-manager.service';
import { CustomWsExceptionFilter } from '@/src/errors/ws-exception-filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new CustomWsExceptionFilter())
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

    this.quizRoomManager.terminateSocket(client);

    this.logger.log(`Client id:${client.id} disconnected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  // TODO: This should fail with proper error message when CreateQuizRoomEventData is not in proper format (use zod validation pipe)
  @SubscribeMessage<QuizRoomClientToServerEvent>('CreateQuizRoom')
  handleCreateQuizRoomEvent(@MessageBody() data: CreateQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`CreateQuizRoom event received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${typeof data}`);

    const quizRoom = this.quizRoomManager.createQuizRoom(client, data);
    quizRoom.addPlayerToQuizRoom(client, data);

    quizRoom.dispatchEventToQuizRoom<QuizRoomState>('SuccessfullyCreatedQuizRoom', quizRoom.state);
    quizRoom.dispatchEventToQuizRoom<QuizRoomState>('SuccessfullyJoinedQuizRoom', quizRoom.state);

    this.logger.log(
      `QuizRoom: ${quizRoom.roomId} have maxAllowed players: ${data.maxPlayersAllowed} and currently ${quizRoom.players.size} Players have joined`,
    );
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('JoinQuizRoom')
  handleJoinQuizRoomEvent(@MessageBody() data: JoinQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`JoinQuizRoom event received from client id: ${client.id} for QuizRoom ${data.quizRoomId}`);
    this.logger.debug(`Payload: ${data}`);

    const quizRoom = this.quizRoomManager.addPlayerToQuizRoom(client, data);
    quizRoom.dispatchEventToQuizRoom<QuizRoomState>('SuccessfullyJoinedQuizRoom', quizRoom.state);

    this.logger.log(`Player joined the QuizRoom: ${quizRoom.roomId}`);
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('StartQuizGame')
  handleStartQuizGameEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log(`StartQuizGame event received from client id: ${client.id}`);

    const quizRoom = this.quizRoomManager.getPlayerQuizRoom(client);

    quizRoom.dispatchEventToQuizRoom<QuizRoomState>('QuizStartingInSomeTime', quizRoom.state);
    quizRoom.startSendingQues();
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('GetQuizRoomState')
  handleGetQuizRoomState(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const quizRoom = this.quizRoomManager.getPlayerQuizRoom(client);
    quizRoom.dispatchEventToQuizRoom<QuizRoomState>('QuizRoomState', quizRoom.state);
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('SelectedAnswer')
  handleAnswer(@MessageBody() data: SelectedAnswerEventData, @ConnectedSocket() client: Socket) {
    const quizRoom = this.quizRoomManager.getPlayerQuizRoom(client);
    quizRoom.updateSelectedAns(client, data);
  }
}
