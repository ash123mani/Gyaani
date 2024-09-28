"use client";

import { Checkbox, Flex, Heading, Stack } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {
  QuizQues,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";

import { socket } from "@/app/socket";
import { WaitingPlayersToJoinContent } from "@/app/quiz-game/components/WaitingPlayersToJoinContent";
import { AllPlayersJoinedContent } from "@/app/quiz-game/components/AllPlayersJoinedContent";

export default function QuizGamePage() {
  const [currentQues, setCurrentQues] = useState<QuizQues | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

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
  } else if (quizRoomState?.quizGame?.hasStarted) {
    content = (
      <Fragment>
        <Heading as="h3" size="2xl">
          {currentQues?.ques}
        </Heading>
        <Stack direction="column" gap={4}>
          {currentQues?.options.map((option: string, index: number) => (
            <Checkbox
              size="lg"
              colorScheme="orange"
              value={index}
              key={option}
              isChecked={index === selectedAnswer}
              onChange={() => setSelectedAnswer(index)}
            >
              {option}
            </Checkbox>
          ))}
        </Stack>
      </Fragment>
    );
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
