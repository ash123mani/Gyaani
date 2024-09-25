import { ErrorDetails, InternalErrorCodes } from "../types";

export const ERRORS: Record<
  InternalErrorCodes,
  Pick<ErrorDetails, "code" | "details" | "message">
> = {
  QUIZ_ROOM_ALREADY_EXISTS: {
    code: "QUIZ_ROOM_ALREADY_EXISTS",
    message: "QuizRoom already exists",
    details: "Seems like this Quiz Room has been occupied already",
  },
  QUIZ_ROOM_NOT_FOUND: {
    code: "QUIZ_ROOM_NOT_FOUND",
    message: "No such quiz room exist",
    details: "Try creating a new room",
  },
  QUIZ_ROOM_ALREADY_FULL: {
    code: "QUIZ_ROOM_ALREADY_FULL",
    message: "Quiz room is already full",
    details: "Try joining new room",
  },
  WS_INTERNAL_SERVER_ERROR: {
    code: "WS_INTERNAL_SERVER_ERROR",
    message: "Something went wrong on our side",
    details:
      "Please try again after some time. If issue persists report it at fixmeqj@gmail.com",
  },
};
