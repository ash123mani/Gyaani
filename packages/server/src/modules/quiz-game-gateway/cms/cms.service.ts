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

const QUIZ_CMS_URL = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIROMENT_ID}/entries`;

@Injectable()
export class CmsService {
  private readonly logger = new Logger(CmsService.name);

  constructor(private readonly httpService: HttpService) {}

  async allQuizCards(): Promise<QuizGameCardsSuccessResponseType['data']> {
    const query =
      'content_type=quizGame&select=fields.topic,fields.subject,fields.questionsCount,sys.id,fields.questions';
    const { data } = await firstValueFrom(
      this.httpService
        .get<ContentfulEntryQuizGameContentType>(
          `${QUIZ_CMS_URL}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&${query}`,
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
          `${QUIZ_CMS_URL}/${gameId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&${query}`,
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
          `${QUIZ_CMS_URL}/${quesId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
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
          this.httpService.get(`${QUIZ_CMS_URL}/${quesId}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`),
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
