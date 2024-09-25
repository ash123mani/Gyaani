import { z } from "zod";

export const QuizRoomClientToServerEventsEnum = z.enum([
  "CreateQuizRoom",
  "JoinQuizRoom",
  "LeaveQuizRoom",

  "WS_SERVER_ERROR",
]);

export const QuizRoomServerToClientEventsEnum = z.enum([
  "SuccessfullyCreatedQuizRoom",
  "SuccessfullyJoinedQuizRoom",
  "StartedQuizGame",
]);

export const CreateQuizRoomEventDataSchema = z.object({
  quizRoomId: z.string(),
  userName: z.string(),
  maxPlayersAllowed: z.number(),
});

export const JoinQuizRoomEventDataSchema = z.object({
  quizRoomId: z.string(),
  userName: z.string(),
});
