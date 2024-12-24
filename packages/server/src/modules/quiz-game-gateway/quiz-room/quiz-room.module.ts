import { Module } from '@nestjs/common';
import { QuizRoomService } from './quiz-room.service';
import { QuizGameModule } from '@/src/modules/quiz-game-gateway/quiz-game/quiz-game.module';

@Module({
  providers: [QuizRoomService],
  exports: [QuizRoomService],
  imports: [QuizGameModule],
})
export class QuizRoomModule {}
