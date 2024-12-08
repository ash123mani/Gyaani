import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuizGateway } from './quiz.gateway';
import { QuizRoomManagerService } from '@/src/modules/quiz/quiz-room-manager.service';
import { CmsService } from '@/src/modules/cms/cms.service';
import { UserModule } from '@/src/modules/user/user.module';

@Module({
  imports: [UserModule, HttpModule],
  providers: [QuizGateway, QuizRoomManagerService, CmsService],
})
export class QuizModule {}
