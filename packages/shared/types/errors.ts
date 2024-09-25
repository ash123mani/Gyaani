import { z } from "zod";
import {
  ErrorDetailsSchema,
  InternalErrorCodesEnum,
  ResponseStatusEnum,
  ServerErrorResponseSchema,
} from "../schema";

export enum QuizRoomServerExceptionEvents {
  LobbyFull = "LobbyFull",
  NoQuizRoomFound = "NoQuizRoomFound",
}

export type ServerExceptionResponse = {
  exception: QuizRoomServerExceptionEvents;
  message?: string | object;
};

export type ResponseStatus = z.infer<typeof ResponseStatusEnum>;

export type InternalErrorCodes = z.infer<typeof InternalErrorCodesEnum>;

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;

export type ServerErrorResponse = z.infer<typeof ServerErrorResponseSchema>;
