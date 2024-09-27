"use client";

import { Checkbox, Flex, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  QuizQues,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";

import { socket } from "@/app/socket";

export default function QuizGamePage() {
  const [currentQues, setCurrentQues] = useState<QuizQues | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    socket.emit<QuizRoomClientToServerEvent>("StartQuizGame");
    socket.on<QuizRoomServerToClientEvents>(
      "NewQuizQuestion",
      handleNewQuizQues,
    );
  }, []);

  function handleNewQuizQues(quizRoom: QuizRoomState) {
    setCurrentQues(quizRoom.quizGame.currentQues);
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
    </Flex>
  );
}
