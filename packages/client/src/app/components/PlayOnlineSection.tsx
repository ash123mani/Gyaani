import { Button, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import {
  CreateQuizRoomEventData,
  JoinQuizRoomEventData,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { useRouter } from "next/navigation";

import { AddPlayerIcon, QuizRoomIcon } from "@/app/icons";
import { CreateQuizModal } from "@/app/components/create-quiz-modal/CreateQuizModal";
import { JoinQuizRoomModal } from "@/app/components/JoinQuizRoomModal";
import { socket } from "@/app/socket";

export const PlayWithFriendsSection = () => {
  const router = useRouter();

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
    <Stack alignItems="center" width="100%" height="100%" spacing={8}>
      <Heading as="h4" color="gray.500">
        Play with online players
      </Heading>
      <Stack
        direction="row"
        wrap="wrap"
        alignItems="center"
        justifyContent="center"
        maxWidth="400px"
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
    </Stack>
  );
};
