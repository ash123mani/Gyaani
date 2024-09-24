export enum QuizRoomServerExceptionEvents {
  LobbyFull = "LobbyFull",
  NoQuizRoomFound = "NoQuizRoomFound",
}

export type ServerExceptionResponse = {
  exception: QuizRoomServerExceptionEvents;
  message?: string | object;
};
