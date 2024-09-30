import {
  Box,
  CircularProgress,
  Heading,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { useCountDownTimer } from "@/app/hooks";

interface StartQuizCountDownProps {
  onCountDownStart?: () => void;
  onCountDownEnd?: () => void;
}

export const START_GAME_COUNT_DOWN_SECS = 5;

export function StartQuizCountDown({
  onCountDownStart,
  onCountDownEnd,
}: StartQuizCountDownProps) {
  const [startCountDownAt] = useCountDownTimer({
    onCountDownStart,
    onCountDownEnd,
  });

  const progressPercent =
    ((startCountDownAt as number) / START_GAME_COUNT_DOWN_SECS) * 100;
  const timeLeftToStartTheGame =
    START_GAME_COUNT_DOWN_SECS - (startCountDownAt as number);
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
