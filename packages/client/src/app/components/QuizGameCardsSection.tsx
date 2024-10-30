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

interface QuizGameCardsSectionProps {
  quizGameCards: QuizGameCardsType[];
}

export const QuizGameCardsSection = ({
  quizGameCards,
}: QuizGameCardsSectionProps) => {
  return (
    <Stack gap={4}>
      <Heading as="h4" color="alphaBlack.500">
        Play with friends or solo
      </Heading>
      <Stack direction="row" gap={4} width="100%" wrap="wrap">
        {quizGameCards.map((quizCard) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={quizCard.id}
            bgColor="gray.100"
            minWidth="200px"
            alignItems="center"
            flex="1"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              flex="1"
            >
              <CardBody py={2}>
                <Heading size="md">{quizCard.subject}</Heading>

                <Text py="2">{quizCard.topic}</Text>
              </CardBody>

              <CardFooter py={2}>
                <Button variant="solid" colorScheme="teal">
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
