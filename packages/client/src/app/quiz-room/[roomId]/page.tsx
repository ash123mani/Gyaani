"use client";

import { useCallback, useEffect, useState } from "react";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { Skeleton, Stack } from "@chakra-ui/react";

import { socket } from "@/app/socket";
import {
  OnAnswerChange,
  QuizQuesView,
} from "@/app/quiz-room/components/QuizQues";
import { QuizGameFinished } from "@/app/quiz-room/components/QuizGameFinished";
import { StartQuizCountDown } from "@/app/quiz-room/components/StartQuizCountDown";

export default function QuizGamePage() {
  const [quizRoomState, setQuizRoomState] = useState<
    QuizRoomState | undefined
  >();

  useEffect(() => {
    socket.on<QuizRoomServerToClientEvents>(
      "QuizRoomState",
      handleQuizRoomState,
    );
  }, []);

  function handleQuizRoomState(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
  }

  const handleAnswerSelection: OnAnswerChange = useCallback((ans) => {
    socket.emit<QuizRoomClientToServerEvent>("SelectedAnswer", {
      selectedAns: ans.selectedAns,
      quesId: ans.quesId,
    });
  }, []);

  if (!quizRoomState?.quizGame.hasStarted) {
    return <StartQuizCountDown />;
  }

  if (quizRoomState?.quizGame.hasFinished) {
    return <QuizGameFinished scores={quizRoomState.quizGame.scores} />;
  }

  if (
    quizRoomState?.quizGame.hasStarted &&
    !quizRoomState?.quizGame.currentQues
  ) {
    return (
      <Stack maxWidth="400px" gap={8}>
        <Skeleton height="60px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <QuizQuesView
      ques={quizRoomState!.quizGame.currentQues}
      onAnsChange={handleAnswerSelection}
    />
  );
}
