import { z } from "zod";

import {
  ContentfulEntryQuizGameContentSchema,
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
