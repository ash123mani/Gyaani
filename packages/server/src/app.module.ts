import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { CmsController } from '@/src/modules/cms/cms.controller';
import { AppService } from './app.service';
import { QuizModule } from '@/src/modules/quiz/quiz.module';
import { QuizRoom } from '@/src/modules/quiz/quiz-room';
import { CmsService } from '@/src/modules/cms/cms.service';
import { SuccessResponseMiddleware } from 'src/common/middlewares';
import { CmsModule } from '@/src/modules/cms/cms.module';
import { UserModule } from '@/src/modules/user/user.module';

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
