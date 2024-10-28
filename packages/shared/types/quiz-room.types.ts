import { z } from "zod";
import {
  CreateQuizRoomEventDataSchema,
  JoinQuizRoomEventDataSchema,
  LeaveRoomEventDataSchema,
  QuiRoomStateSchema,
  QuizQuesSchema,
  QuizRoomClientToServerEventsEnum,
  QuizRoomServerToClientEventsEnum,
  SelectedAnswerEventDataSchema,
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

export type SelectedAnswerEventData = z.infer<
  typeof SelectedAnswerEventDataSchema
>;

export type LeaveRoomEventData = z.infer<typeof LeaveRoomEventDataSchema>;
