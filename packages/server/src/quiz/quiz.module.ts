import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuizGateway } from './quiz.gateway';
import { QuizRoomManagerService } from '@/src/quiz/quiz-room-manager.service';
import { CmsService } from '@/src/cms/cms.service';

@Module({
  imports: [HttpModule],
  providers: [QuizGateway, QuizRoomManagerService, CmsService],
})
export class QuizModule {}
