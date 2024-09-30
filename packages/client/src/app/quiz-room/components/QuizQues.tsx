import { Box, Checkbox, Heading, Progress, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { QuizQues } from "@qj/shared";

import { useCountDownTimer } from "@/app/hooks";
import { START_GAME_COUNT_DOWN_SECS } from "@/app/quiz-room/components/StartQuizCountDown";

interface QizQuesProps {
  ques: QuizQues;
}

export function QuizQuesView({ ques }: QizQuesProps) {
  const [startCountDownAt] = useCountDownTimer({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

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

      <Progress value={progressPercent} size="lg" colorScheme="orange" />
    </Box>
  );
}
