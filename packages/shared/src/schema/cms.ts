import { z } from "zod";

const MetadataSchema = z.object({
  tags: z.array(z.string()), // Assuming tags is an array of strings
  concepts: z.array(z.string()), // Assuming concepts is an array of strings
});

export const ContentfulQuizRoomContentModelSchema = z.object({
  metadata: MetadataSchema,
  fields: z.object({
    topic: z.string(),
    subject: z.string(),
    questionsCount: z.number(),
    correctAnswerPoints: z.number(),
    incorrectAnswerPoints: z.number(),
    unattemptedAnswerPoints: z.number(),
    questions: z.array(
      z.object({
        sys: z.object({
          type: z.string(),
          linkType: z.string(),
          id: z.string(),
        }),
      }),
    ),
  }),
  sys: z.object({
    id: z.string(),
  }),
});

export const ContentfulQuizQuestionContentModelSchema = z.object({
  metadata: MetadataSchema,
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    options: z.array(z.string()),
    correctAnswer: z.number(),
    quesTitle: z.string(),
  }),
});

export const ContentfulEntryQuizGameContentSchema = z.object({
  sys: z.object({
    type: z.literal("Array"),
  }),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  items: z.array(ContentfulQuizRoomContentModelSchema),
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
