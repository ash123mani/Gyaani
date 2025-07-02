import { Module } from '@nestjs/common';
import { QuizRoomService } from './quiz-room.service';
import { QuizGameModule } from '@/src/modules/quiz-game-gateway/quiz-game/quiz-game.module';
import { UserModule } from '@/src/modules/user/user.module';

@Module({
  providers: [QuizRoomService],
  exports: [QuizRoomService],
  imports: [QuizGameModule, UserModule],
})
export class QuizRoomModule {}
