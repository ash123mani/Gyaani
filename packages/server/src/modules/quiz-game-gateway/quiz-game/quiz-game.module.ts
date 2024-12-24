import { Module } from '@nestjs/common';
import { QuizGameService } from './quiz-game.service';

@Module({
  providers: [QuizGameService],
  exports: [QuizGameService],
})
export class QuizGameModule {}
