import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { CmsController } from '@/src/cms/cms.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuizRoom } from './quiz/quiz-room';
import { CmsService } from '@/src/cms/cms.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, QuizModule],
  controllers: [AppController, CmsController],
  providers: [AppService, CmsService, QuizRoom],
})
export class AppModule {}
