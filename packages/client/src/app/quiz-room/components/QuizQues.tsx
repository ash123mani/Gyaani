import {
  Box,
  Checkbox,
  Heading,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useMemo, useRef, useState } from "react";
import {
  ContentfulQuizQuestionContentModelType,
  QUIZ_QUES_GAP_MILLISECONDS,
} from "@qj/shared";

import { useCountDownTimer } from "@/app/hooks";

import { QUIZ_QUES_GAP_SECS } from "../../../../../shared/src/config";

export type OnAnswerChange = ({
  quesId,
  selectedAns,
}: {
  quesId: string;
  selectedAns: number;
}) => void;

interface QizQuesProps {
  ques: ContentfulQuizQuestionContentModelType;
  onAnsChange: OnAnswerChange;
  currentQuesIndex: number;
  totalQuestions: number;
}

function QuizQuesView({
  ques,
  onAnsChange,
  currentQuesIndex,
  totalQuestions,
}: QizQuesProps) {
  const prevQuesRef = useRef<ContentfulQuizQuestionContentModelType | null>(
    ques,
  );
  const [startCountDownAt, resetCountDownAt] = useCountDownTimer({
    countDownSecs: QUIZ_QUES_GAP_MILLISECONDS / 1000,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  if (prevQuesRef.current?.sys?.id !== ques.sys.id) {
    prevQuesRef.current = ques;
    resetCountDownAt(QUIZ_QUES_GAP_MILLISECONDS / 1000);
    setSelectedAnswer(-1);
  }

  const progressPercent = (startCountDownAt / QUIZ_QUES_GAP_SECS) * 100;

  const renderOptions = useMemo(
    () =>
      ques?.fields.options.map((option: string, index: number) => (
        <Checkbox
          size="lg"
          py={2}
          value={index}
          key={option}
          isChecked={index === selectedAnswer}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSelectedAnswer(Number(event.target.value));
            onAnsChange({
              quesId: ques.sys.id,
              selectedAns: Number(event.target.value) + 1,
            });
          }}
          fontWeight="bold"
        >
          {option}
        </Checkbox>
      )),
    [ques?.fields, onAnsChange, selectedAnswer],
  );

  return (
    <Box display="flex" flexDirection="column" w="100%" h="100%">
      <Box m={6} h="100%">
        <Stack direction="column" gap={8}>
          <Heading as="h3" size="2xl">
            {ques?.fields.quesTitle}
          </Heading>
          <Stack direction="column" gap={4}>
            {renderOptions}
          </Stack>
        </Stack>
      </Box>

      <Text fontSize="md" textAlign="center" my={1} fontStyle="italic">
        Question {currentQuesIndex} of {totalQuestions}
      </Text>

      <Progress
        value={progressPercent}
        size="md"
        color="red.200"
        key={ques.sys.id}
      />
    </Box>
  );
}

const MemoizedQuizQuesView = memo(QuizQuesView);

export { MemoizedQuizQuesView as QuizQuesView };
