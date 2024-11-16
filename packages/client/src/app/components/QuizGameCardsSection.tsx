import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { QuizGameCardsType } from "@qj/shared";

import { AddPlayerIcon, QuizRoomIcon } from "@/app/icons";

interface QuizGameCardsSectionProps {
  quizGameCards: QuizGameCardsType[];
  onQuizGameCardClick: (quizGameId: string) => void;
  onJoinRoomClick: () => void;
}

export const QuizGameCardsSection = ({
  quizGameCards,
  onQuizGameCardClick,
  onJoinRoomClick,
}: QuizGameCardsSectionProps) => {
  return (
    <Stack spacing={8} alignItems="center" width="100%" height="100%">
      <Stack
        direction="row"
        spacing={8}
        borderTop="thin"
        width="100%"
        justifyContent="space-between"
      >
        <Heading as="h4" color="gray.500" mb={8}>
          Play with friends or solo
        </Heading>
        <Button
          onClick={onJoinRoomClick}
          colorScheme="cyan"
          leftIcon={<AddPlayerIcon />}
          width="fit-content"
        >
          Join a quiz room
        </Button>
      </Stack>

      <Stack direction="row" spacing={8} width="100%" wrap="wrap">
        {quizGameCards.map((quizCard) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={quizCard.id}
            bgColor="gray.100"
            minWidth="200px"
            flex="1"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              flex="1"
            >
              <CardBody p={4}>
                <Heading size="md">{quizCard.subject}</Heading>

                <Text py="2">{quizCard.topic}</Text>
                <Text py="2">Total Questions: {quizCard.questionsCount}</Text>
              </CardBody>

              <CardFooter p={4}>
                <Button
                  variant="solid"
                  leftIcon={<QuizRoomIcon />}
                  onClick={() => {
                    onQuizGameCardClick(quizCard.id);
                  }}
                >
                  Play
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
