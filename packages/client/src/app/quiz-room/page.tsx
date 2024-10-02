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
  }, []);

  function handleQuizRoomState(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
  }

  function handleQuizGameStartClick() {
    router.push(`/quiz-room/${quizRoomState!.roomId}`);
  }

  let content = null;
  if (!quizRoomState?.hasAllPlayersJoined && quizRoomState?.roomId) {
    content = <WaitingPlayersToJoinContent roomId={quizRoomState.roomId} />;
  } else {
    content = (
      <AllPlayersJoinedContent
        onQuizGameStartClick={handleQuizGameStartClick}
        isHost={socket.id === quizRoomState?.hostSocketId}
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
