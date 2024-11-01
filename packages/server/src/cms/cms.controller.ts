import { Controller, Get } from '@nestjs/common';

import { CmsService } from '@/src/cms/cms.service';

import { ContentfulEntryQuizGameContentType, QuizGameCardsSuccessResponseType } from '@qj/shared';

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
  async getQuizGameConfig(): Promise<ContentfulEntryQuizGameContentType> {
    return await this.cmsService.quizGameConfig();
  }
}
