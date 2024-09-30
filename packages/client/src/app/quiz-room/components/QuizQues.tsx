import { Checkbox, Heading, Stack } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { QuizQues } from "@qj/shared";

interface QizQuesProps {
  ques: QuizQues;
}

export function QuizQuesView({ ques }: QizQuesProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <Fragment>
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
    </Fragment>
  );
}
