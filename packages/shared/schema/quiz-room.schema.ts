import { z } from "zod";

export const QuizRoomClientToServerEventsEnum = z.enum([
  "CreateQuizRoom",
  "JoinQuizRoom",
  "LeaveQuizRoom",
  "StartQuizGame",
  "GetQuizRoomState",
  "GetQuizQues",

  "WS_SERVER_ERROR",
]);

export const QuizRoomServerToClientEventsEnum = z.enum([
  "SuccessfullyCreatedQuizRoom",
  "SuccessfullyJoinedQuizRoom",
  "QuizGameReadyToStart",
  "QuizRoomState",
  "QuizGameStarted",
  "NewQuizQuestion",
  "QuizGameEnded",
]);

export const CreateQuizRoomEventDataSchema = z.object({
  userName: z.string().min(2, {
    message:
      "Player Name should be minimum of 2 characters. Please enter 2 or more characters.",
  }),
  maxPlayersAllowed: z.number().int().min(1, { message: "Required" }),
});

export const QuizQuesSchema = z.object({
  ques: z.string(),
  options: z.array(z.string()),
  id: z.string(),
});

export const QuiRoomStateSchema = z.object({
  users: z.array(z.string().min(2, { message: "Required" })),
  roomId: z.string().min(2, { message: "Required" }),
  hasAllPlayersJoined: z.boolean(),
  quizGame: z.object({
    hasStarted: z.boolean(),
    hasFinished: z.boolean(),
    currentQues: QuizQuesSchema,
    isLatsQues: z.boolean(),
  }),
});

export const JoinQuizRoomEventDataSchema = z.object({
  quizRoomId: z.string().min(5, {
    message:
      "Room code should be minimum of 5 characters. Please enter 5 or more characters.",
  }),
  userName: z.string().min(2, {
    message:
      "Player Name should be minimum of 2 characters. Please enter 2 or more characters.",
  }),
});
