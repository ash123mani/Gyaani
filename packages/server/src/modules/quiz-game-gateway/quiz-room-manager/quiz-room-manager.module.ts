import { Module } from '@nestjs/common';
import { QuizRoomManagerService } from './quiz-room-manager.service';
import { UserModule } from '@/src/modules/user/user.module';
import { CmsService } from '@/src/modules/quiz-game-gateway/cms/cms.service';
import { HttpModule } from '@nestjs/axios';
import { QuizRoomModule } from '@/src/modules/quiz-game-gateway/quiz-room/quiz-room.module';

@Module({
  providers: [QuizRoomManagerService, CmsService],
  exports: [QuizRoomManagerService],
  imports: [UserModule, HttpModule, QuizRoomModule],
})
export class QuizRoomManagerModule {}
