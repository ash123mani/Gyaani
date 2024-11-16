import { Box, Button, Heading } from "@chakra-ui/react";
import { QuizRoomState } from "@qj/shared";

import { FinalScoreTable } from "@/app/quiz-room/components/FinalScoreTable";

interface GameEndedScreenProps {
  scores: QuizRoomState["quizGame"]["scores"];
  totalQuestions: number;
  onPlayAgain: () => void;
}

export function GameEndedScreen({
  scores,
  totalQuestions,
  onPlayAgain,
}: GameEndedScreenProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={8}
    >
      <Heading as="h2" color="red.400">
        Quiz Finished
      </Heading>
      <FinalScoreTable scores={scores} totalQuestions={totalQuestions} />
      <Button onClick={onPlayAgain} colorScheme="whiteAlpha">
        Play Again
      </Button>
    </Box>
  );
}
