"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  QuizQues,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";

import { socket } from "@/app/socket";
import { QuizQuesView } from "@/app/quiz-room/components/QuizQues";

export default function QuizRoomPage() {
  const [currentQues, setCurrentQues] = useState<QuizQues | null>(null);
  const isLatQuesRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    socket.emit<QuizRoomClientToServerEvent>("GetQuizQues");
    socket.on<QuizRoomServerToClientEvents>(
      "NewQuizQuestion",
      handleNewQuizQues,
    );
  }, []);

  useLayoutEffect(() => {
    const timerId = setInterval(() => {
      if (isLatQuesRef.current) {
        clearInterval(timerId);
        return;
      }
      socket.emit<QuizRoomClientToServerEvent>("GetQuizQues");
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  function handleNewQuizQues(quizRoom: QuizRoomState) {
    setCurrentQues(quizRoom.quizGame.currentQues);
    isLatQuesRef.current = quizRoom.quizGame.isLatsQues;
  }

  if (!currentQues) {
    return null;
  }

  return <QuizQuesView ques={currentQues} />;
}
