import { z } from "zod";

export const ResponseStatusEnum = z.enum(["error", "success"]);

export const InternalErrorCodesEnum = z.enum([
  "QUIZ_ROOM_ALREADY_EXISTS",
  "QUIZ_ROOM_NOT_FOUND",
  "QUIZ_ROOM_ALREADY_FULL",

  "WS_INTERNAL_SERVER_ERROR",
]);

export const ErrorDetailsSchema = z.object({
  code: InternalErrorCodesEnum,
  message: z.string(),
  details: z.string(),
  timestamp: z.date(),
});

export const ServerErrorResponseSchema = z.object({
  status: ResponseStatusEnum,
  statusCode: z.number(),
  error: ErrorDetailsSchema,
});
