import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuizRoomService } from './quiz/quiz-room.service';

@Module({
  imports: [QuizModule],
  controllers: [AppController],
  providers: [AppService, QuizRoomService],
})
export class AppModule {}
