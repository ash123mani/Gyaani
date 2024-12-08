import { z } from "zod";
import { Socket } from "socket.io";
import {
  ContentfulQuizQuestionContentModelSchema,
  ContentfulQuizRoomContentModelSchema,
} from "./cms";
import { ContentfulQuizQuestionContentModelType } from "../types";

export const QuizRoomClientToServerEventsEnum = z.enum([
  "CreateQuizRoom",
  "JoinQuizRoom",
  "LeaveQuizRoom",
  "GetQuizRoomState",
  "PlayAgain",

  "SelectedAnswer",

  "WS_SERVER_ERROR",
]);

export const QuizRoomServerToClientEventsEnum = z.enum([
  "SuccessfullyCreatedQuizRoom",
  "SuccessfullyJoinedQuizRoom",
  "QuizRoomState",
]);

export const CreateQuizRoomEventDataSchema = z.object({
  userName: z.string().min(2, {
    message:
      "Player Name should be minimum of 2 characters. Please enter 2 or more characters.",
  }),
  quizGameId: z.string().min(1),
  maxPlayersAllowed: z.number().int().min(1, { message: "Required" }),
});

export const QuizQuesSchema = z.object({
  ques: z.string(),
  options: z.array(z.string()),
  id: z.string(),
});

export const PlayerScoreSchema = z.object({
  playerId: z.string().min(2, { message: "Required" }),
  playerName: z.string().min(2, { message: "Required" }),
  score: z.number(),
  inCorrectQuesCount: z.number(),
  correctQuesCount: z.number(),
  // unAttemptedQuesCount: z.number(),
});

export const QuiRoomStateSchema = z.object({
  users: z.array(z.string().min(2, { message: "Required" })),
  roomId: z.string().min(2, { message: "Required" }),
  hasAllPlayersJoined: z.boolean(),
  hostSocketId: z.custom<Socket["id"]>(),
  quizRoomConfig: ContentfulQuizRoomContentModelSchema,
  newQuizQues: z.array(ContentfulQuizQuestionContentModelSchema),
  maxPlayersAllowed: z.number(),
  quizGame: z.object({
    hasStarted: z.boolean(),
    hasFinished: z.boolean(),
    currentQues: ContentfulQuizQuestionContentModelSchema,
    hasNextQues: z.boolean(),
    totalScore: z.number(),
    scores: z.array(PlayerScoreSchema),
    totalQues: z.number(),
    currentQuesIndex: z.number(),
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

export const SelectedAnswerEventDataSchema = z.object({
  selectedAns: z.number(),
  quesId: z.string().min(2, {}),
});

export const LeaveRoomEventDataSchema = z.object({
  roomId: z.string(),
});

export const PlayAgainEventDataSchema = z.object({
  currentRoomId: z.string(),
  quizGameId: z.string().min(1),
});
