import { z } from "zod";
import {
  QuizRoomClientToServerEventsEnum,
  QuizRoomServerToClientEventsEnum,
} from "../schema/quiz-room.schema";

export type QuizRoomClientToServerEvents = z.infer<
  typeof QuizRoomClientToServerEventsEnum
>;

export type QuizRoomServerToClientEvents = z.infer<
  typeof QuizRoomServerToClientEventsEnum
>;
