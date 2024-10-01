import { Box, Checkbox, Heading, Progress, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { QuizQues } from "@qj/shared";

import { useCountDownTimer } from "@/app/hooks";
import { START_GAME_COUNT_DOWN_SECS } from "@/app/quiz-room/components/StartQuizCountDown";

interface QizQuesProps {
  ques: QuizQues;
  countDownSecs?: number;
}

export function QuizQuesView({
  ques,
  countDownSecs = START_GAME_COUNT_DOWN_SECS,
}: QizQuesProps) {
  const prevQuesRef = useRef<QuizQues | null>(ques);
  const [startCountDownAt, resetCountDownAt] = useCountDownTimer({
    countDownSecs,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (prevQuesRef.current !== ques) {
    prevQuesRef.current = ques;
    resetCountDownAt();
  }

  const progressPercent =
    ((startCountDownAt as number) / START_GAME_COUNT_DOWN_SECS) * 100;

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box margin="auto">
        <Stack direction="column" gap={4}>
          <Heading as="h3" size="2xl">
            {ques?.ques}
          </Heading>
          <Stack direction="column" gap={4}>
            {ques?.options.map((option: string, index: number) => (
              <Checkbox
                size="lg"
                colorScheme="orange"
                value={index}
                key={option}
                isChecked={index === selectedAnswer}
                onChange={() => setSelectedAnswer(index)}
              >
                {option}
              </Checkbox>
            ))}
          </Stack>
        </Stack>
      </Box>

      <Progress
        value={progressPercent}
        size="lg"
        colorScheme="orange"
        key={ques.id}
      />
    </Box>
  );
}
