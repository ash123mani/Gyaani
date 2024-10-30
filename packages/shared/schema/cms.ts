import { z } from "zod";

export const ContentfulEntriesByContentTypeSchema = z.object({
  sys: z.object({
    type: z.literal("Array"),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(
    z.object({
      fields: z.object({
        topic: z.string(),
        subject: z.string(),
        questionsCount: z.number(),
      }),
      sys: z.object({
        id: z.string(),
      }),
    }),
  ),
});

export const QuizGameCardsSchema = z.object({
  topic: z.string(),
  subject: z.string(),
  questionsCount: z.number(),
  id: z.string(),
});

export const QuizGameCardsSuccessResponseSchema = z.object({
  success: z.boolean(),
  quizGameCards: z.array(QuizGameCardsSchema),
});
