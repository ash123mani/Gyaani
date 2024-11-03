import { z } from "zod";

import {
  ContentfulEntryQuizGameContentSchema,
  ContentfulQuizQuestionContentModelSchema,
  ContentfulQuizRoomContentModelSchema,
  QuizGameCardsSchema,
  QuizGameCardsSuccessResponseSchema,
} from "../schema";

export type ContentfulEntryQuizGameContentType = z.infer<
  typeof ContentfulEntryQuizGameContentSchema
>;

export type QuizGameCardsType = z.infer<typeof QuizGameCardsSchema>;

export type QuizGameCardsSuccessResponseType = z.infer<
  typeof QuizGameCardsSuccessResponseSchema
>;

export type ContentfulQuizGameContentModelType = z.infer<
  typeof ContentfulQuizRoomContentModelSchema
>;

export type ContentfulQuizQuestionContentModelType = z.infer<
  typeof ContentfulQuizQuestionContentModelSchema
>;
