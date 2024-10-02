import {
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { QuizRoomState } from "@qj/shared";

interface QuizGameFinishedProps {
  scores: QuizRoomState["quizGame"]["scores"];
}

export function QuizGameFinished({ scores }: QuizGameFinishedProps) {
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
      <TableContainer>
        <Table variant="simple" size="md">
          <TableCaption placement="top">Scores</TableCaption>
          <Thead>
            <Tr>
              <Th>Player Name</Th>
              <Th isNumeric>Correct Ques</Th>
              <Th isNumeric>InCorrect Ques</Th>
              <Th isNumeric>Unattempted Ques</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scores.map((playerScore) => {
              return (
                <Tr key={playerScore.playerId}>
                  <Td>{playerScore.playerName}</Td>
                  <Td isNumeric>{playerScore.correctQuesCount}</Td>
                  <Td isNumeric>{playerScore.inCorrectQuesCount}</Td>
                  <Td isNumeric>{playerScore.unAttemptedQuesCount}</Td>
                  <Td isNumeric>{playerScore.score}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
