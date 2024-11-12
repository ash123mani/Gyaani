import { Box, Checkbox, Heading, Progress, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useMemo, useRef, useState } from "react";
import { ContentfulQuizQuestionContentModelType, QuizQues } from "@qj/shared";
import { QUIZ_QUES_GAP_SECS } from "@qj/shared/config";

import { useCountDownTimer } from "@/app/hooks";

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
}

function QuizQuesView({ ques, onAnsChange }: QizQuesProps) {
  const prevQuesRef = useRef<ContentfulQuizQuestionContentModelType | null>(
    ques,
  );
  const [startCountDownAt, resetCountDownAt] = useCountDownTimer({});
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

  if (prevQuesRef.current?.sys?.id !== ques.sys.id) {
    prevQuesRef.current = ques;
    resetCountDownAt();
    setSelectedAnswer(-1);
  }

  const progressPercent = (startCountDownAt / QUIZ_QUES_GAP_SECS) * 100;

  const renderOptions = useMemo(
    () =>
      ques?.fields.options.map((option: string, index: number) => (
        <Checkbox
          size="lg"
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
          <Stack direction="column" gap={8}>
            {renderOptions}
          </Stack>
        </Stack>
      </Box>

      <Progress
        value={progressPercent}
        size="sm"
        color="red.200"
        key={ques.sys.id}
      />
    </Box>
  );
}

const MemoizedQuizQuesView = memo(QuizQuesView);

export { MemoizedQuizQuesView as QuizQuesView };
