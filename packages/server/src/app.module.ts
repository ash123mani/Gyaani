import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { CmsController } from '@/src/modules/quiz-game-gateway/cms/cms.controller';
import { AppService } from './app.service';
import { QuizModule } from '@/src/modules/quiz-game-gateway/quiz.module';
import { CmsService } from '@/src/modules/quiz-game-gateway/cms/cms.service';
import { SuccessResponseMiddleware } from 'src/common/middlewares';
import { CmsModule } from '@/src/modules/quiz-game-gateway/cms/cms.module';
import { UserModule } from '@/src/modules/user/user.module';
import { QuizRoomModule } from '@/src/modules/quiz-game-gateway/quiz-room/quiz-room.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, QuizModule, CmsModule, UserModule, QuizRoomModule],
  controllers: [AppController, CmsController],
  providers: [AppService, CmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SuccessResponseMiddleware).forRoutes('*');
  }
}
