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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CmsService {
  private readonly logger = new Logger(CmsService.name);
  private QUIZ_CMS_URL = `https://cdn.contentful.com/spaces/${this.configService.get('CONTENTFUL_SPACE_ID')}/environments/${this.configService.get('CONTENTFUL_ENVIROMENT_ID')}/entries`;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async allQuizCards(): Promise<QuizGameCardsSuccessResponseType['data']> {
    const query = 'select=fields.topic,fields.subject,fields.questionsCount,sys.id,fields.questions';
    console.log(
      'URL',
      `${this.QUIZ_CMS_URL}?access_token=${this.configService.get('CONTENTFUL_ACCESS_TOKEN')}&content_type=quizGame&${query}`,
    );
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulEntryQuizGameContentType>(
          `${this.QUIZ_CMS_URL}?access_token=${this.configService.get('CONTENTFUL_ACCESS_TOKEN')}&content_type=quizGame&${query}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data || 'Error occurred while getting quiz-game-gateway game cards');
            throw error;
          }),
        ),
    );

    return {
      quizGameCards: data?.items.map((item) => ({
        topic: item.fields.topic,
        subject: item.fields.subject,
        questionsCount: item.fields.questions.length,
        id: item.sys.id,
      })),
    };
  }

  async quizGameConfig(gameId: string): Promise<ContentfulQuizGameContentModelType> {
    const query = 'content_type=quizGame&select=fields.topic,fields.subject,fields.questionsCount,sys.id';
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulQuizGameContentModelType>(
          `${this.QUIZ_CMS_URL}/${gameId}?access_token=${this.configService.get('CONTENTFUL_ACCESS_TOKEN')}&${query}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              error.response?.data || `Error while loading QuizGame configuration for gameId ${gameId}`,
            );
            throw error;
          }),
        ),
    );

    return data;
  }

  async quizGameQuesConfig(quesId: string): Promise<ContentfulQuizQuestionContentModelType> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulQuizQuestionContentModelType>(
          `${this.QUIZ_CMS_URL}/${quesId}?access_token=${this.configService.get('CONTENTFUL_ACCESS_TOKEN')}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              error.response?.data || `Error while loading QuizGame Question configuration for quesId ${quesId}`,
            );
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
            `${this.QUIZ_CMS_URL}/${quesId}?access_token=${this.configService.get('CONTENTFUL_ACCESS_TOKEN')}`,
          ),
        ),
      );

      // Use Promise.all to execute all requests simultaneously
      const responses = await Promise.all(apiRequests);

      // Extract data from each response
      // Return the combined results
      return responses.map((response) => response.data);
    } catch (error) {
      this.logger.error(`Error while loading QuizGame Questions configuration for quesId ${JSON.stringify(quesIds)}`);
      throw error;
    }
  }
}
