"use client";

import { Box, Divider, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QuizGameCardsType } from "@qj/shared";

import { socket } from "@/app/socket";
import { PlayWithFriendsSection } from "@/app/components/PlayOnlineSection";
import apiClient from "@/app/be-client/api-client";
import { QuizGameCardsSection } from "@/app/components/QuizGameCardsSection";

export default function Home() {
  const [quizGameCards, setQuizGameCards] = useState<
    QuizGameCardsType[] | null
  >(null);

  useEffect(() => {
    socket.connect();
    (async () => {
      const resp = await apiClient.quizGameCms.getQuizGameCards();
      setQuizGameCards(resp!.data.quizGameCards);
    })();
  }, []);

  console.log("quizGameCards", quizGameCards);

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
          <QuizGameCardsSection quizGameCards={quizGameCards} />
        ) : (
          <Spinner />
        )}
      </Stack>
    </Stack>
  );
}
