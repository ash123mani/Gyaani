import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Heading,
  CircularProgressLabel,
} from "@chakra-ui/react";

const START_GAME_COUNT_DOWN_SECS = 5;

export function StartQuizCountDown({ onCountDownStart, onCountDownEnd }) {
  const [startCountDownAt, setStartCountDownAt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartCountDownAt((prev) =>
        prev >= START_GAME_COUNT_DOWN_SECS ? 0 : prev + 1,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = (startCountDownAt / START_GAME_COUNT_DOWN_SECS) * 100;
  const timeLeftToStartTheGame = START_GAME_COUNT_DOWN_SECS - startCountDownAt;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      <Heading
        as="h2"
        size="2xl"
        color="gray.400"
        textAlign="center"
        colorScheme="orange"
      >
        Game will start in {timeLeftToStartTheGame} seconds
      </Heading>
      <CircularProgress value={progressPercent} size="120px" color="orange">
        <CircularProgressLabel color="orange" fontSize="16px" fontWeight="bold">
          {timeLeftToStartTheGame} secs
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
