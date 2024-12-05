import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { CmsController } from '@/src/cms/cms.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuizRoom } from './quiz/quiz-room';
import { CmsService } from '@/src/cms/cms.service';
import { SuccessResponseMiddleware } from '@/src/middlewares';
import { CmsModule } from '@/src/cms/cms.module';
import { UserModule } from '@/src/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, QuizModule, CmsModule, UserModule],
  controllers: [AppController, CmsController],
  providers: [AppService, CmsService, QuizRoom],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SuccessResponseMiddleware).forRoutes('*');
  }
}
