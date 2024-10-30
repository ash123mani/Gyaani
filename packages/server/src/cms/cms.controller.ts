import { Controller, Get } from '@nestjs/common';

import { CmsService } from '@/src/cms/cms.service';

import { QuizGameCardsSuccessResponseType } from '@qj/shared';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  async getAllTheQuizCards(): Promise<QuizGameCardsSuccessResponseType> {
    return await this.cmsService.allQuizCards();
  }
}
