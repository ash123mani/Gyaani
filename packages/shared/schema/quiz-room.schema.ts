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
  userName: z.string().min(2, { message: "Required" }),
  maxPlayersAllowed: z.number().int().min(1, { message: "Required" }),
});

export const SuccessfullyCreatedQuizRoomEventPayloadSchema = z.object({
  users: z.array(z.string().min(2, { message: "Required" })),
  quizRoomId: z.string().min(2, { message: "Required" }),
  hasGameStarted: z.boolean(),
});

export const JoinQuizRoomEventDataSchema = z.object({
  quizRoomId: z.string(),
  userName: z.string(),
});
