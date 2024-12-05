import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuizGateway } from './quiz.gateway';
import { QuizRoomManagerService } from '@/src/quiz/quiz-room-manager.service';
import { CmsService } from '@/src/cms/cms.service';
import { UserService } from '@/src/user/user.service';

@Module({
  imports: [HttpModule, UserService],
  providers: [QuizGateway, QuizRoomManagerService, CmsService],
})
export class QuizModule {}
