import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CmsService } from '@/src/modules/quiz-game-gateway/cms/cms.service';
import { UserModule } from '@/src/modules/user/user.module';
import { QuizGateway } from '@/src/modules/quiz-game-gateway/quiz.gateway';
import { QuizRoomModule } from '@/src/modules/quiz-game-gateway/quiz-room/quiz-room.module';
import { QuizRoomManagerModule } from '@/src/modules/quiz-game-gateway/quiz-room-manager/quiz-room-manager.module';

@Module({
  imports: [UserModule, HttpModule, QuizRoomModule, QuizRoomManagerModule],
  providers: [QuizGateway, CmsService],
})
export class QuizModule {}
