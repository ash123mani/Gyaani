"use client";

import { useEffect, useRef, useState } from "react";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { useBoolean } from "@chakra-ui/react";

import { socket } from "@/app/socket";
import { QuizQuesView } from "@/app/quiz-room/components/QuizQues";
import { StartQuizCountDown } from "@/app/quiz-room/components/StartQuizCountDown";
import { QuizGameFinished } from "@/app/quiz-room/components/QuizGameFinished";

export default function QuizGamePage() {
  const isLastQuesRef = useRef<boolean>(false);
  const [showStartCountDown, setShowStartCountDown] = useBoolean(true);
  const [quizRoomState, setQuizRoomState] = useState<
    QuizRoomState | undefined
  >();

  useEffect(() => {
    socket.on<QuizRoomServerToClientEvents>(
      "NewQuizQuestion",
      handleNewQuizQues,
    );
    socket.on<QuizRoomServerToClientEvents>("QuizGameEnded", handQuizGameEnded);
  }, []);

  useEffect(() => {
    setShowStartCountDown.on();
    const timerId = setInterval(() => {
      if (isLastQuesRef.current) {
        socket.emit<QuizRoomClientToServerEvent>("EndQuizGame");
        clearInterval(timerId);
        return;
      }
      socket.emit<QuizRoomClientToServerEvent>("GetQuizQues");
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  function handleNewQuizQues(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
    isLastQuesRef.current = quizRoom.quizGame.isLatsQues;
  }

  function handQuizGameEnded(quizRoom: QuizRoomState) {
    setQuizRoomState(quizRoom);
  }

  if (showStartCountDown) {
    return <StartQuizCountDown onCountDownEnd={setShowStartCountDown.off} />;
  }

  if (quizRoomState?.quizGame.hasFinished) {
    return <QuizGameFinished />;
  }

  return <QuizQuesView ques={quizRoomState!.quizGame.currentQues} />;
}
