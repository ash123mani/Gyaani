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
    <Stack spacing={8} alignItems="center" width="100%" height="100%">
      <Heading as="h4" color="gray.500">
        Play with friends or solo
      </Heading>
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
              </CardBody>

              <CardFooter p={4}>
                <Button variant="solid" colorScheme="blackAlpha">
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
