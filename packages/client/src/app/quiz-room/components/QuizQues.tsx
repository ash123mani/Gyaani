import { Box, Checkbox, Heading, Progress, Stack } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { QuizQues } from "@qj/shared";

import { useCountDownTimer } from "@/app/hooks";
import { START_GAME_COUNT_DOWN_SECS } from "@/app/quiz-room/components/StartQuizCountDown";

export type OnAnswerChange = ({
  quesId,
  selectedAns,
}: {
  quesId: string;
  selectedAns: number;
}) => void;

interface QizQuesProps {
  ques: QuizQues;
  onAnsChange: OnAnswerChange;
}

export function QuizQuesView({ ques, onAnsChange }: QizQuesProps) {
  const prevQuesRef = useRef<QuizQues | null>(ques);
  const [startCountDownAt, resetCountDownAt] = useCountDownTimer({});
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  if (prevQuesRef.current !== ques) {
    prevQuesRef.current = ques;
    resetCountDownAt();
    setSelectedAnswer(-1);
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setSelectedAnswer(Number(event.target.value));
                  onAnsChange({
                    quesId: ques.id,
                    selectedAns: Number(event.target.value),
                  });
                }}
              >
                {option}
              </Checkbox>
            ))}
          </Stack>
        </Stack>
      </Box>

      <Progress
        value={progressPercent}
        size="xs"
        color="red.200"
        key={ques.id}
      />
    </Box>
  );
}
