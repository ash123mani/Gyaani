"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { Skeleton, Spinner, Stack } from "@chakra-ui/react";

import { socket } from "@/app/socket";
import {
  OnAnswerChange,
  QuizQuesView,
} from "@/app/quiz-room/components/QuizQues";
import { QuizGameFinished } from "@/app/quiz-room/components/QuizGameFinished";
import { StartQuizCountDown } from "@/app/quiz-room/components/StartQuizCountDown";
import { WaitingPlayersToJoinContent } from "@/app/quiz-room/components/WaitingPlayersToJoinContent";

export default function QuizGamePage() {
  const [quizRoomState, setQuizRoomState] = useState<
    QuizRoomState | undefined
  >();

  useEffect(() => {
    socket.emit<QuizRoomClientToServerEvent>("GetQuizRoomState");

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

  if (
    !quizRoomState?.hasAllPlayersJoined &&
    quizRoomState?.roomId &&
    !quizRoomState?.quizGame.hasStarted
  ) {
    return <WaitingPlayersToJoinContent roomId={quizRoomState.roomId} />;
  }

  if (
    quizRoomState?.hasAllPlayersJoined &&
    quizRoomState?.roomId &&
    !quizRoomState?.quizGame.hasStarted
  ) {
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

  if (!quizRoomState) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <QuizQuesView
        ques={quizRoomState.quizGame.currentQues}
        onAnsChange={handleAnswerSelection}
      />
    </Fragment>
  );
}
