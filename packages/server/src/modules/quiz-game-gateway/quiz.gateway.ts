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
  LeaveRoomEventData,
  PlayAgainEventData,
  QuizRoomClientToServerEvent,
  QuizRoomState,
  SelectedAnswerEventData,
} from '@qj/shared';
import { QuizRoomManagerService } from '@/src/modules/quiz-game-gateway/quiz-room-manager/quiz-room-manager.service';
import { CustomWsExceptionFilter } from '@/src/common/exception-filters/ws-exception-filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new CustomWsExceptionFilter())
export class QuizGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(QuizGateway.name);
  @WebSocketServer()
  private readonly io;

  constructor(private readonly quizRoomManager: QuizRoomManagerService) {}

  afterInit(server: Server) {
    this.quizRoomManager.server = server;
    this.logger.log('Quiz Room Server is running', server.sockets.name);
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
  async handleCreateQuizRoomEvent(@MessageBody() data: CreateQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`CreateQuizRoom event received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${typeof data}`);

    const quizRoom = await this.quizRoomManager._createQuizRoom(client, data);

    quizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('SuccessfullyCreatedQuizRoom', quizRoom.state);
    quizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('SuccessfullyJoinedQuizRoom', quizRoom.state);

    if (quizRoom.hasAllPlayersJoined) {
      quizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('QuizRoomState', quizRoom.state);
      quizRoom.startSendingQues();
    }

    this.logger.log(
      `QuizRoom: ${quizRoom.roomId} have maxAllowed players: ${data.maxPlayersAllowed} and currently ${quizRoom.players.size} Players have joined`,
    );
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('JoinQuizRoom')
  handleJoinQuizRoomEvent(@MessageBody() data: JoinQuizRoomEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`JoinQuizRoom event received from client id: ${client.id} for QuizRoom ${data.quizRoomId}`);
    this.logger.debug(`Payload: ${data}`);

    const quizRoom = this.quizRoomManager.addPlayerToQuizRoom(client, data);
    quizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('SuccessfullyJoinedQuizRoom', quizRoom.state);

    if (quizRoom.hasAllPlayersJoined) {
      quizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('QuizRoomState', quizRoom.state);
      quizRoom.startSendingQues();
    }

    this.logger.log(`Player joined the QuizRoom: ${quizRoom.roomId}`);
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('GetQuizRoomState')
  handleGetQuizRoomState(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const quizRoom = this.quizRoomManager.getPlayerQuizRoom(client);
    quizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('QuizRoomState', quizRoom.state);
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('SelectedAnswer')
  handleAnswer(@MessageBody() data: SelectedAnswerEventData, @ConnectedSocket() client: Socket) {
    this.logger.log(`SelectedAnswer event received from client id: ${client.id}`);
    this.logger.log(`SelectedAnswer is: ${data.selectedAns}`);

    const quizRoom = this.quizRoomManager.getPlayerQuizRoom(client);
    quizRoom.updateSelectedAns(client, data);
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('LeaveQuizRoom')
  handleLeaveQuizRoom(@MessageBody() data: LeaveRoomEventData, @ConnectedSocket() client: Socket) {
    const quizRoom = this.quizRoomManager.getPlayerQuizRoom(client);
    quizRoom?.removePlayerFromQuizRoom(client.id, client);
    quizRoom?.dispatchEventToQuizRoom<QuizRoomState | null>('QuizRoomState', quizRoom.state);
  }

  @SubscribeMessage<QuizRoomClientToServerEvent>('PlayAgain')
  async handlePlayAgain(@MessageBody() data: PlayAgainEventData) {
    const newQuizRoom = await this.quizRoomManager.playAgain(data.currentRoomId, data.quizGameId);

    newQuizRoom.dispatchEventToQuizRoom<QuizRoomState | null>('QuizRoomState', newQuizRoom.state);
    newQuizRoom.startSendingQues();
  }
}
