"use client";

import { Box, Button, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  QuizRoomState,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
} from "@qj/shared";

import { socket } from "@/app/socket";
import { WaitingToJoinRoomModal } from "@/app/components/waiting-to-join-modal/WaitingToJoinRoomModal";
import { CreateQuizModal } from "@/app/components/create-quiz-modal/CreateQuizModal";
import { JoinQuizRoomModal } from "@/app/components/join-quiz-room-modal/JoinQuizRoomModal";

import styles from "./styles.module.css";

export default function Home() {
  const {
    isOpen: isCreateQuizRoomModalOpen,
    onOpen: onCreateQuizRoomModalOpen,
    onClose: onCreateQuizRoomModalClose,
  } = useDisclosure({ id: "CreateQuizRoomModalOpen" });

  const {
    isOpen: isWaitingRoomModalOpen,
    onOpen: onWaitingRoomModalOpen,
    onClose: onWaitingRoomModalClose,
  } = useDisclosure({ id: "WaitingRoomModalOpen" });

  const {
    isOpen: isJoinRoomModalOpen,
    onOpen: onJoinRoomModalOpen,
    onClose: onJoinRoomModalClose,
  } = useDisclosure({ id: "JoinRoomModalOpen" });

  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");

  function handleQuizGameStart() {
    router.replace("/quiz-game");
  }

  function handleSuccessfulQuizRoomJoin(quizRoom: QuizRoomState) {
    onJoinRoomModalClose();
    setRoomId(quizRoom.roomId);
    if (!quizRoom.quizGame.hasStarted) onWaitingRoomModalOpen();
    socket.on<QuizRoomServerToClientEvents>(
      "StartedQuizGame",
      handleQuizGameStart,
    );
  }

  function handleJoinQuizRoomSubmit(values: JoinQuizRoomEventData) {
    socket.emit<QuizRoomClientToServerEvent>("JoinQuizRoom", values);
    socket.on<QuizRoomServerToClientEvents>(
      "SuccessfullyJoinedQuizRoom",
      handleSuccessfulQuizRoomJoin,
    );
  }

  function handleCreateQuizRoomSubmit(values: CreateQuizRoomEventData) {
    socket.emit<QuizRoomClientToServerEvent>("CreateQuizRoom", values);
    socket.on<QuizRoomServerToClientEvents>(
      "SuccessfullyCreatedQuizRoom",
      handleSuccessfulQuizRoomJoin,
    );
  }

  return (
    <Box as="main" className={styles.main}>
      <Heading as="h1" size="2xl" color="blackAlpha.500">
        Start Playing Quiz
      </Heading>
      <Stack spacing={2} direction="row">
        <Button
          onClick={onCreateQuizRoomModalOpen}
          colorScheme="orange"
          leftIcon={<AddIcon />}
        >
          Create a quiz room
        </Button>
        <Button
          onClick={onJoinRoomModalOpen}
          colorScheme="blackAlpha"
          rightIcon={<ArrowForwardIcon />}
        >
          Join a quiz room
        </Button>
      </Stack>
      <CreateQuizModal
        onClose={onCreateQuizRoomModalClose}
        isOpen={isCreateQuizRoomModalOpen}
        onCreateQuizRoomSubmit={handleCreateQuizRoomSubmit}
      />
      <WaitingToJoinRoomModal
        isOpen={isWaitingRoomModalOpen}
        onClose={onWaitingRoomModalClose}
        roomId={roomId}
      />
      <JoinQuizRoomModal
        isOpen={isJoinRoomModalOpen}
        onClose={onJoinRoomModalClose}
        onJoinQuizRoomSubmit={handleJoinQuizRoomSubmit}
      />
    </Box>
  );
}
