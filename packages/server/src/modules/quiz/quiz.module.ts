import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuizGateway } from './quiz.gateway';
import { QuizRoomManagerService } from '@/src/modules/quiz/quiz-room-manager.service';
import { CmsService } from '@/src/modules/cms/cms.service';
import { UserService } from '@/src/modules/user/user.service';

@Module({
  imports: [HttpModule, UserService],
  providers: [QuizGateway, QuizRoomManagerService, CmsService],
})
export class QuizModule {}
