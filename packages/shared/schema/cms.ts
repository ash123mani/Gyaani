import { z } from "zod";

export const ContentfulEntryQuizGameContentSchema = z.object({
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
        correctAnswerPoints: z.number(),
        incorrectAnswerPoints: z.number(),
        unattemptedAnswerPoints: z.number(),
        questions: z.array(
          z.object({
            type: z.string(),
            linkType: z.string(),
            id: z.string(),
          }),
        ),
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
  data: z.object({
    quizGameCards: z.array(QuizGameCardsSchema),
  }),
});
