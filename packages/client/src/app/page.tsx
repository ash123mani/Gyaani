"use client";

import { Box, Button, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import { CreateQuizModal } from "@/app/components/create-quiz-modal/CreateQuizModal";

import styles from "./styles.module.css";
import { WaitingToJoinRoomModal } from "@/app/components/waiting-to-join-modal/WaitingToJoinRoomModal";
import { useState } from "react";
import { socket } from "@/app/socket";
import { QuizRoomServerToClientEvents } from "@qj/shared";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");

  function handleQuizGameStart() {
    router.replace("/quiz-game");
  }

  function handleSuccessfulQuizRoomCreation(values: unknown) {
    onCreateQuizRoomModalClose();
    // TODO: Fix this mis types
    setRoomId(
      (values as unknown as { quizRoomId: string; hasGameStarted: boolean })
        .quizRoomId,
    );
    // TODO: Fix this mis types
    if (
      !(values as unknown as { quizRoomId: string; hasGameStarted: boolean })
        .hasGameStarted
    ) {
      onWaitingRoomModalOpen();
    }

    socket.on<QuizRoomServerToClientEvents>(
      "StartedQuizGame",
      handleQuizGameStart,
    );
  }

  return (
    <Box as="main" className={styles.main}>
      <Heading as="h1" size="2xl" color="blackAlpha.500">
        Start Playing Quiz
      </Heading>
      <Stack spacing={2} direction="row">
        <Button
          colorScheme="orange"
          leftIcon={<AddIcon />}
          onClick={onCreateQuizRoomModalOpen}
        >
          Create a quiz room
        </Button>
        <Button colorScheme="blackAlpha" rightIcon={<ArrowForwardIcon />}>
          Join a quiz room
        </Button>
      </Stack>
      <CreateQuizModal
        onClose={onCreateQuizRoomModalClose}
        isOpen={isCreateQuizRoomModalOpen}
        onSuccessfulQuizRoomCreation={handleSuccessfulQuizRoomCreation}
      />
      <WaitingToJoinRoomModal
        isOpen={isWaitingRoomModalOpen}
        onClose={onWaitingRoomModalClose}
        roomId={roomId}
      />
    </Box>
  );
}
