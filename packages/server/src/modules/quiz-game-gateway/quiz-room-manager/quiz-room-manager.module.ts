import { Module } from '@nestjs/common';
import { QuizRoomManagerService } from './quiz-room-manager.service';
import { UserModule } from '@/src/modules/user/user.module';
import { CmsService } from '@/src/modules/quiz-game-gateway/cms/cms.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [QuizRoomManagerService, CmsService],
  exports: [QuizRoomManagerService],
  imports: [UserModule, HttpModule],
})
export class QuizRoomManagerModule {}
