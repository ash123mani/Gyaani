import { Module } from '@nestjs/common';
import { QuizGateway } from './quiz.gateway';
import { QuizRoomManagerService } from '@/src/quiz/quiz-room-manager.service';

@Module({
  providers: [QuizGateway, QuizRoomManagerService],
})
export class QuizModule {}
