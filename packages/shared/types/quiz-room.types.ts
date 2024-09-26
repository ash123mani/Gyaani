import { z } from "zod";
import {
  CreateQuizRoomEventDataSchema,
  JoinQuizRoomEventDataSchema,
  QuiRoomStateSchema,
  QuizQuesSchema,
  QuizRoomClientToServerEventsEnum,
  QuizRoomServerToClientEventsEnum,
} from "../schema";

export type QuizRoomClientToServerEvent = z.infer<
  typeof QuizRoomClientToServerEventsEnum
>;

export type QuizRoomServerToClientEvents = z.infer<
  typeof QuizRoomServerToClientEventsEnum
>;

export type CreateQuizRoomEventData = z.infer<
  typeof CreateQuizRoomEventDataSchema
>;

export type JoinQuizRoomEventData = z.infer<typeof JoinQuizRoomEventDataSchema>;

export type QuizRoomState = z.infer<typeof QuiRoomStateSchema>;

export type QuizQues = z.infer<typeof QuizQuesSchema>;
