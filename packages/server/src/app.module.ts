import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuizRoom } from './quiz/quiz-room';

@Module({
  imports: [QuizModule],
  controllers: [AppController],
  providers: [AppService, QuizRoom],
})
export class AppModule {}
