"use client";

import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  QuizQues,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";

import { socket } from "@/app/socket";
import { WaitingPlayersToJoinContent } from "@/app/quiz-game/components/WaitingPlayersToJoinContent";
import { AllPlayersJoinedContent } from "@/app/quiz-game/components/AllPlayersJoinedContent";
import { QuizQuesView } from "@/app/quiz-game/components/QuizQues";

export default function QuizGamePage() {
  const [currentQues, setCurrentQues] = useState<QuizQues | null>(null);

  const [quizRoomState, setQuizRoomState] = useState<QuizRoomState | undefined>(
    undefined,
  );

  useEffect(() => {
    socket.emit<QuizRoomClientToServerEvent>("GetQuizRoomState");
    socket.on<QuizRoomServerToClientEvents>(
      "QuizRoomState",
      handleQuizRoomState,
    );

    socket.on("QuizGameStarted", handleQuizRoomState);
    socket.on<QuizRoomServerToClientEvents>(
      "NewQuizQuestion",
      handleNewQuizQues,
    );
  }, []);

  function handleQuizRoomState(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
    handleNewQuizQues(quizRoom);
  }

  function handleNewQuizQues(quizRoom: QuizRoomState) {
    setCurrentQues(quizRoom.quizGame.currentQues);
  }

  function handleQuizGameStartClick() {
    socket.emit<QuizRoomClientToServerEvent>("StartQuizGame");
  }

  let content = null;
  if (!quizRoomState?.hasAllPlayersJoined && quizRoomState?.roomId) {
    content = <WaitingPlayersToJoinContent roomId={quizRoomState.roomId} />;
  } else if (quizRoomState?.quizGame?.hasStarted && currentQues) {
    content = <QuizQuesView ques={currentQues} />;
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
      as="main"
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
