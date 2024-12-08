import {
  Box,
  CircularProgress,
  Heading,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { useCountDownTimer } from "@/app/hooks";

import { WAIT_TIME_BEFORE_QUIZ_START_SECS } from "../../../../../shared/src/config";

export function StartQuizCountDown() {
  const [timeLeft] = useCountDownTimer({
    countDownSecs: WAIT_TIME_BEFORE_QUIZ_START_SECS,
  });

  const progressPercent = (timeLeft / WAIT_TIME_BEFORE_QUIZ_START_SECS) * 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="8"
      w="100%"
      h="100%"
    >
      <Heading
        as="h2"
        size="2xl"
        color="gray.400"
        textAlign="center"
        colorScheme="orange"
      >
        Game will start in {timeLeft} seconds
      </Heading>
      <CircularProgress value={progressPercent} size="160px">
        <CircularProgressLabel fontSize="16px" fontWeight="bold">
          {timeLeft} secs
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
