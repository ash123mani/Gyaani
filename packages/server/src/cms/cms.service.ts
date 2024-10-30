import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ContentfulEntriesByContentTypeType } from '@qj/shared';
import type { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CmsService {
  private readonly logger = new Logger(CmsService.name);

  constructor(private readonly httpService: HttpService) {}

  async allQuizCards() {
    const endPoint = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIROMENT_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=quizGame&select=fields.topic,fields.subject,fields.questionsCount,sys.id`;

    const { data } = await firstValueFrom(
      this.httpService.get<ContentfulEntriesByContentTypeType>(endPoint).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    const quizGameCards = data?.items.map((item) => ({
      topic: item.fields.topic,
      subject: item.fields.subject,
      questionsCount: item.fields.questionsCount,
      id: item.sys.id,
    }));

    return {
      success: true,
      quizGameCards,
    };
  }
}
