import { z } from "zod";

import {
  ContentfulEntriesByContentTypeSchema,
  QuizGameCardsSchema,
  QuizGameCardsSuccessResponseSchema,
} from "../schema";

export type ContentfulEntriesByContentTypeType = z.infer<
  typeof ContentfulEntriesByContentTypeSchema
>;

export type QuizGameCardsType = z.infer<typeof QuizGameCardsSchema>;

export type QuizGameCardsSuccessResponseType = z.infer<
  typeof QuizGameCardsSuccessResponseSchema
>;
