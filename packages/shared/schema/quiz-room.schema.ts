import { z } from "zod";

export const QuizRoomClientToServerEventsEnum = z.enum([
  "CreateQuizRoom",
  "JoinQuizRoom",
  "LeaveQuizRoom",
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
