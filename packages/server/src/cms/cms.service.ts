import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  ContentfulEntryQuizGameContentType,
  ContentfulQuizGameContentModelType,
  ContentfulQuizQuestionContentModelType,
  QuizGameCardsSuccessResponseType,
} from '@qj/shared';
import type { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CmsService {
  private readonly logger = new Logger(CmsService.name);

  constructor(private readonly httpService: HttpService) {}

  async allQuizCards(): Promise<QuizGameCardsSuccessResponseType['data']> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulEntryQuizGameContentType>(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIROMENT_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=quizGame&select=fields.topic,fields.subject,fields.questionsCount,sys.id`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return {
      quizGameCards: data?.items.map((item) => ({
        topic: item.fields.topic,
        subject: item.fields.subject,
        questionsCount: item.fields.questionsCount,
        id: item.sys.id,
      })),
    };
  }

  async quizGameConfig(gameId: string): Promise<ContentfulQuizGameContentModelType> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulQuizGameContentModelType>(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIROMENT_ID}/entries/${gameId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=quizGame&select=fields.topic,fields.subject,fields.questionsCount,sys.id`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async quizGameQuesConfig(quesId: string): Promise<ContentfulQuizQuestionContentModelType> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulQuizQuestionContentModelType>(
          `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIROMENT_ID}/entries/${quesId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async allQuizGameQuesConfig(quesIds: string[]): Promise<ContentfulQuizQuestionContentModelType[]> {
    try {
      // Map over the array of URLs and create HTTP requests for each one
      const apiRequests = quesIds.map((quesId) =>
        firstValueFrom(
          this.httpService.get(
            `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIROMENT_ID}/entries/${quesId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
          ),
        ),
      );

      // Use Promise.all to execute all requests simultaneously
      const responses = await Promise.all(apiRequests);

      // Extract data from each response
      // Return the combined results
      return responses.map((response) => response.data);
    } catch (error) {
      throw new Error(`Error fetching data from APIs: ${error.message}`);
    }
  }
}
