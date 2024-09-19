import { z } from "zod";

export const QuizRoomClientToServerEventsEnum = z.enum([
  "CreateQuizRoom",
  "JoinQuizRoom",
  "LeaveQuizRoom",
]);

export const QuizRoomServerToClientEventsEnum = z.enum([
  "SuccessfullyCreatedQuizRoom",
  "SuccessfullyJoinedQuizRoom",
]);
