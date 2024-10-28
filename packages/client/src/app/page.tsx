"use client";

import { Box, Button, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { socket } from "@/app/socket";
import { CreateQuizModal } from "@/app/quiz-room/components/create-quiz-modal/CreateQuizModal";
import { JoinQuizRoomModal } from "@/app/quiz-room/components/JoinQuizRoomModal";
import { AddPlayerIcon, QuizRoomIcon } from "@/app/icons";

import styles from "./styles.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    socket.connect();
  }, []);

  const {
    isOpen: isCreateQuizRoomModalOpen,
    onOpen: onCreateQuizRoomModalOpen,
    onClose: onCreateQuizRoomModalClose,
  } = useDisclosure({ id: "CreateQuizRoomModalOpen" });

  const {
    isOpen: isJoinRoomModalOpen,
    onOpen: onJoinRoomModalOpen,
    onClose: onJoinRoomModalClose,
  } = useDisclosure({ id: "JoinRoomModalOpen" });

  function handleSuccessfulQuizRoomJoin(quizRoom: QuizRoomState) {
    onJoinRoomModalClose();
    onCreateQuizRoomModalClose();
    router.replace(`/quiz-room/${quizRoom.roomId}`);
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
      "SuccessfullyJoinedQuizRoom",
      handleSuccessfulQuizRoomJoin,
    );
  }

  return (
    <Box className={styles.main}>
      <Heading as="h1" size="2xl" color="blackAlpha.500">
        Start Playing Quiz
      </Heading>
      <Stack
        spacing={2}
        direction="row"
        wrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          onClick={onCreateQuizRoomModalOpen}
          leftIcon={<QuizRoomIcon />}
          width="100%"
        >
          Create a quiz room
        </Button>
        <Button
          onClick={onJoinRoomModalOpen}
          colorScheme="cyan"
          leftIcon={<AddPlayerIcon />}
          width="100%"
        >
          Join a quiz room
        </Button>
      </Stack>
      <CreateQuizModal
        onClose={onCreateQuizRoomModalClose}
        isOpen={isCreateQuizRoomModalOpen}
        onCreateQuizRoomSubmit={handleCreateQuizRoomSubmit}
      />
      <JoinQuizRoomModal
        isOpen={isJoinRoomModalOpen}
        onClose={onJoinRoomModalClose}
        onJoinQuizRoomSubmit={handleJoinQuizRoomSubmit}
      />
    </Box>
  );
}
