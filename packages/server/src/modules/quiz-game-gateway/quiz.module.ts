import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserModule } from '@/src/modules/user/user.module';
import { QuizGateway } from '@/src/modules/quiz-game-gateway/quiz.gateway';
import { QuizRoomManagerModule } from '@/src/modules/quiz-game-gateway/quiz-room-manager/quiz-room-manager.module';

@Module({
  imports: [UserModule, HttpModule, QuizRoomManagerModule],
  providers: [QuizGateway],
})
export class QuizModule {}
