"use client";

import { Box, Divider, Spinner, Stack, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QuizGameCardsType } from "@qj/shared";

import { socket } from "@/app/socket";
import { PlayWithFriendsSection } from "@/app/components/PlayOnlineSection";
import apiClient from "@/app/be-client/api-client";
import { QuizGameCardsSection } from "@/app/components/QuizGameCardsSection";

import styles from "./styles.module.css";

export default function Home() {
  const [quizGameCards, setQuizGameCards] = useState<
    QuizGameCardsType[] | null
  >(null);

  useEffect(() => {
    socket.connect();
    (async () => {
      const resp = await apiClient.quizGameCms.getQuizGameCards();
      console.log("resp", resp);
      setQuizGameCards(resp!.data.quizGameCards);
    })();
  }, []);

  console.log("quizGameCards", quizGameCards);

  return (
    <Stack gap={4} wrap="wrap">
      <Box
        flex="1"
        m={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <PlayWithFriendsSection />
      </Box>
      <Divider backgroundColor="red" color="red" />
      <Stack flex="1" m={4} minWidth="50%">
        {quizGameCards ? (
          <QuizGameCardsSection quizGameCards={quizGameCards} />
        ) : (
          <Spinner />
        )}
      </Stack>
    </Stack>
  );
}
