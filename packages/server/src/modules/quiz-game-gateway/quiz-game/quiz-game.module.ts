import { Module } from '@nestjs/common';
import { QuizGameService } from './quiz-game.service';
import { CmsService } from '@/src/modules/quiz-game-gateway/cms/cms.service';

@Module({
  providers: [QuizGameService, CmsService],
  exports: [QuizGameService],
})
export class QuizGameModule {}
