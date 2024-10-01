"use client";

import { useEffect, useState } from "react";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { Skeleton, Stack, useBoolean } from "@chakra-ui/react";

import { socket } from "@/app/socket";
import { QuizQuesView } from "@/app/quiz-room/components/QuizQues";
import { StartQuizCountDown } from "@/app/quiz-room/components/StartQuizCountDown";
import { QuizGameFinished } from "@/app/quiz-room/components/QuizGameFinished";

export default function QuizGamePage() {
  const [showStartCountDown, setShowStartCountDown] = useBoolean(true);
  const [quizRoomState, setQuizRoomState] = useState<
    QuizRoomState | undefined
  >();

  useEffect(() => {
    socket.emit<QuizRoomClientToServerEvent>("StartQuizGame");
  }, []);

  useEffect(() => {
    socket.on<QuizRoomServerToClientEvents>(
      "QuizStartingInSomeTime",
      setShowStartCountDown.on,
    );
    socket.on("QuizGameStarted", handleQuizGameStart);

    socket.on<QuizRoomServerToClientEvents>(
      "NewQuizQuestion",
      handleNewQuizQues,
    );
    socket.on<QuizRoomServerToClientEvents>("QuizGameEnded", handQuizGameEnded);
  }, []);

  function handleQuizGameStart() {
    setShowStartCountDown.off();
  }

  function handleNewQuizQues(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
  }

  function handQuizGameEnded(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
  }

  if (showStartCountDown) {
    return <StartQuizCountDown />;
  }

  if (quizRoomState?.quizGame.hasFinished) {
    return <QuizGameFinished />;
  }

  if (!showStartCountDown && !quizRoomState?.quizGame.currentQues) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return <QuizQuesView ques={quizRoomState!.quizGame.currentQues} />;
}
