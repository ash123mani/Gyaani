import { z } from "zod";
import {
  CreateQuizRoomEventDataSchema,
  JoinQuizRoomEventDataSchema,
  QuizRoomClientToServerEventsEnum,
  QuizRoomServerToClientEventsEnum,
  SuccessfullyCreatedQuizRoomEventPayloadSchema,
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

export type SuccessfullyCreatedQuizRoomEventPayload = z.infer<
  typeof SuccessfullyCreatedQuizRoomEventPayloadSchema
>;
