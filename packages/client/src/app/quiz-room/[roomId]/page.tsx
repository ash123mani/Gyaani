"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { Skeleton, Spinner, Stack } from "@chakra-ui/react";
import { useRouter, useParams } from "next/navigation";

import { socket } from "@/app/socket";
import {
  OnAnswerChange,
  QuizQuesView,
} from "@/app/quiz-room/components/QuizQues";
import { GameEndedScreen } from "@/app/quiz-room/components/GameEndedScreen";
import { StartQuizCountDown } from "@/app/quiz-room/components/StartQuizCountDown";
import { WaitingPlayersToJoinContent } from "@/app/quiz-room/components/WaitingPlayersToJoinContent";
import { PlayerScores } from "@/app/quiz-room/components/PlayerScores";

export default function QuizGamePage() {
  const router = useRouter();
  const params = useParams<{ roomId: string }>();
  console.log("params", params);

  const [quizRoomState, setQuizRoomState] = useState<
    QuizRoomState | undefined
  >();

  useEffect(() => {
    if (!socket.connected) router.push("/");

    socket.emit<QuizRoomClientToServerEvent>("GetQuizRoomState");

    socket.on<QuizRoomServerToClientEvents>(
      "QuizRoomState",
      handleQuizRoomState,
    );
  }, []);

  function handleQuizRoomState(quizRoom: QuizRoomState) {
    // When Play again is opted, all players will go into a new room!
    if (quizRoom?.roomId && params.roomId !== quizRoom?.roomId) {
      router.replace(`/quiz-room/${quizRoom?.roomId}`);
    }

    setQuizRoomState(quizRoom);
  }

  const handleAnswerSelection: OnAnswerChange = useCallback((ans) => {
    socket.emit<QuizRoomClientToServerEvent>("SelectedAnswer", {
      selectedAns: ans.selectedAns,
      quesId: ans.quesId,
    });
  }, []);

  function handlePlayAgainClick() {
    socket.emit<QuizRoomClientToServerEvent>("PlayAgain", {
      currentRoomId: quizRoomState!.roomId,
      quizGameId: quizRoomState!.quizRoomConfig.sys.id,
    });
  }

  if (
    !quizRoomState?.hasAllPlayersJoined &&
    quizRoomState?.roomId &&
    !quizRoomState?.quizGame.hasStarted
  ) {
    return (
      <Fragment>
        <WaitingPlayersToJoinContent roomId={quizRoomState.roomId} />
        <PlayerScores playerScores={quizRoomState.quizGame.scores} />
      </Fragment>
    );
  }

  if (
    quizRoomState?.hasAllPlayersJoined &&
    quizRoomState?.roomId &&
    !quizRoomState?.quizGame.hasStarted
  ) {
    return (
      <Fragment>
        <StartQuizCountDown />
        <PlayerScores playerScores={quizRoomState.quizGame.scores} />
      </Fragment>
    );
  }

  if (quizRoomState?.quizGame.hasFinished) {
    return (
      <GameEndedScreen
        scores={quizRoomState.quizGame.scores}
        totalQuestions={quizRoomState.quizGame.totalQues}
        onPlayAgain={handlePlayAgainClick}
      />
    );
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
        currentQuesIndex={quizRoomState.quizGame.currentQuesIndex}
        totalQuestions={quizRoomState.quizGame.totalQues}
      />
      <PlayerScores playerScores={quizRoomState.quizGame.scores} />
    </Fragment>
  );
}
