import { Module } from '@nestjs/common';
import { QuizRoomManagerService } from './quiz-room-manager.service';
import { UserModule } from '@/src/modules/user/user.module';

@Module({
  providers: [QuizRoomManagerService],
  exports: [QuizRoomManagerService],
  imports: [UserModule],
})
export class QuizRoomManagerModule {}
