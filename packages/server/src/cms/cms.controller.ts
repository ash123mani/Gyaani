import { Controller, Get } from '@nestjs/common';

import { CmsService } from '@/src/cms/cms.service';

import {
  ContentfulQuizGameContentModelType,
  ContentfulQuizQuestionContentModelType,
  QuizGameCardsSuccessResponseType,
} from '@qj/shared';

@Controller({
  path: 'cms',
})
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('allQuizCards')
  async getAllTheQuizCards(): Promise<QuizGameCardsSuccessResponseType['data']> {
    return await this.cmsService.allQuizCards();
  }

  @Get('quizGameConfig')
  async getQuizGameConfig(quizGameId: string): Promise<ContentfulQuizGameContentModelType> {
    return await this.cmsService.quizGameConfig(quizGameId);
  }

  @Get('quizQuesConfig')
  async getQuizQuesConfig(quesId: string): Promise<ContentfulQuizQuestionContentModelType> {
    return await this.cmsService.quizGameQuesConfig(quesId);
  }
}
