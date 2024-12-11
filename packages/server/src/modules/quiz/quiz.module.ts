import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuizRoomManagerService } from '@/src/modules/quiz/quiz-room-manager.service';
import { CmsService } from '@/src/modules/cms/cms.service';
import { UserModule } from '@/src/modules/user/user.module';
import { QuizGateway } from '@/src/modules/quiz/quiz.gateway';
import { QuizGameModule } from '@/src/modules/quiz-game/quiz-game.module';
import { QuizRoomModule } from '@/src/modules/quiz-room/quiz-room.module';

@Module({
  imports: [UserModule, HttpModule, QuizGameModule, QuizRoomModule],
  providers: [QuizGateway, QuizRoomManagerService, CmsService],
})
export class QuizModule {}
