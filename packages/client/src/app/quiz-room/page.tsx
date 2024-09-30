"use client";

import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { useRouter } from "next/navigation";

import { socket } from "@/app/socket";
import { WaitingPlayersToJoinContent } from "@/app/quiz-room/components/WaitingPlayersToJoinContent";
import { AllPlayersJoinedContent } from "@/app/quiz-room/components/AllPlayersJoinedContent";

export default function QuizRoomPage() {
  const router = useRouter();
  const [quizRoomState, setQuizRoomState] = useState<QuizRoomState | undefined>(
    undefined,
  );

  useEffect(() => {
    socket.emit<QuizRoomClientToServerEvent>("GetQuizRoomState");

    socket.on<QuizRoomServerToClientEvents>(
      "QuizRoomState",
      handleQuizRoomState,
    );

    socket.on("QuizGameStarted", handleQuizGameStart);
  }, []);

  function handleQuizRoomState(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
  }

  function handleQuizGameStartClick() {
    socket.emit<QuizRoomClientToServerEvent>("StartQuizGame");
  }

  function handleQuizGameStart(room: QuizRoomState) {
    router.push(`/quiz-room/${room!.roomId}`);
  }

  let content = null;
  if (!quizRoomState?.hasAllPlayersJoined && quizRoomState?.roomId) {
    content = <WaitingPlayersToJoinContent roomId={quizRoomState.roomId} />;
  } else {
    content = (
      <AllPlayersJoinedContent
        onQuizGameStartClick={handleQuizGameStartClick}
      />
    );
  }

  return (
    <Flex
      direction="column"
      mx="auto"
      gap={8}
      p={4}
      width="fit-content"
      height="100%"
      justifyContent="center"
    >
      {content}
    </Flex>
  );
}
