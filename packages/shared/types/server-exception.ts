export enum QuizRoomServerErrors {
  LobbyFull = "LobbyFull",
  NoQuizRoomFound = "NoQuizRoomFound",
}

export type ServerExceptionResponse = {
  exception: QuizRoomServerErrors;
  message?: string | object;
};
