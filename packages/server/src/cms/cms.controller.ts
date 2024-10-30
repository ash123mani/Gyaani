import { Controller, Get } from '@nestjs/common';

import { CmsService } from '@/src/cms/cms.service';

import { QuizGameCardsSuccessResponseType } from '@qj/shared';

@Controller({
  path: 'cms',
})
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('allQuizCards')
  async getAllTheQuizCards(): Promise<QuizGameCardsSuccessResponseType> {
    return await this.cmsService.allQuizCards();
  }
}
