import { QuizRoomService } from '@/src/quiz/quiz-room.service';
import { Server } from 'socket.io';
import { CreateQuizRoomEventData } from '@qj/shared/dist/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizRoomManagerService {
  public server: Server;
  private readonly lobbies: Map<QuizRoomService['id'], QuizRoomService> = new Map<
    QuizRoomService['id'],
    QuizRoomService
  >();

  public createQuizRoom(createQuizRoomEventData: CreateQuizRoomEventData): QuizRoomService {
    const quizRoom = new QuizRoomService(this.server, createQuizRoomEventData.maxPlayersAllowed);
    this.lobbies.set(createQuizRoomEventData.quizRoomId, quizRoom);

    return quizRoom;
  }
}
