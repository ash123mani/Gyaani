import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizGateway } from './quiz.gateway';

@Module({
  providers: [QuizGateway, QuizService],
})
export class QuizModule {}
