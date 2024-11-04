"use client";

import { Box, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CreateQuizRoomEventData,
  QuizGameCardsType,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { useRouter } from "next/navigation";

import { socket } from "@/app/socket";
import { PlayWithFriendsSection } from "@/app/components/PlayOnlineSection";
import apiClient from "@/app/be-client/api-client";
import { QuizGameCardsSection } from "@/app/components/QuizGameCardsSection";
import { CreateQuizModal } from "@/app/components/create-quiz-modal/CreateQuizModal";

export default function Home() {
  const router = useRouter();

  const [quizGameCards, setQuizGameCards] = useState<
    QuizGameCardsType[] | null
  >(null);
  const [selectedQuizGameId, setSelectedQuizGameId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    socket.connect();

    (async () => {
      const resp = await apiClient.quizGameCms.getQuizGameCards();
      setQuizGameCards(resp!.data.quizGameCards);
    })();
  }, []);

  function handleQuizGameCardClick(quizGameId: string) {
    setSelectedQuizGameId(quizGameId);
  }

  function handleSuccessfulQuizRoomJoin(quizRoom: QuizRoomState) {
    setSelectedQuizGameId(null);
    router.replace(`/quiz-room/${quizRoom.roomId}`);
  }

  function handleCreateQuizRoomSubmit(values: CreateQuizRoomEventData) {
    socket.emit<QuizRoomClientToServerEvent>("CreateQuizRoom", values);
    socket.on<QuizRoomServerToClientEvents>(
      "SuccessfullyJoinedQuizRoom",
      handleSuccessfulQuizRoomJoin,
    );
  }

  function handleCreateQuizRoomModalClose() {
    setSelectedQuizGameId(null);
  }

  const isCreateQuizRoomModalOpen = !!selectedQuizGameId;
  return (
    <Stack wrap="wrap" height="inherit">
      <Box
        flex="1"
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderBottom="thinLight"
        borderRadius="md"
      >
        <PlayWithFriendsSection />
      </Box>
      <Stack flex="1" spacing={4} p={4} borderTop="thinLight" borderRadius="md">
        {quizGameCards ? (
          <QuizGameCardsSection
            quizGameCards={quizGameCards}
            onQuizGameCardClick={handleQuizGameCardClick}
          />
        ) : (
          <Spinner />
        )}
      </Stack>
      <CreateQuizModal
        onClose={handleCreateQuizRoomModalClose}
        isOpen={isCreateQuizRoomModalOpen}
        onCreateQuizRoomSubmit={handleCreateQuizRoomSubmit}
        quizGameId={selectedQuizGameId!}
      />
    </Stack>
  );
}
