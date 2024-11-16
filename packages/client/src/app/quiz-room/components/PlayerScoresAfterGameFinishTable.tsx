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

import { socket } from "@/app/socket";

interface QuizGameFinishedProps {
  scores: QuizRoomState["quizGame"]["scores"];
  totalQuestions: number;
}

export function PlayerScoresAfterGameFinishTable({
  scores,
  totalQuestions,
}: QuizGameFinishedProps) {
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
            {scores.map((player) => {
              const isCurrentUser = player.playerId === socket.id;

              return (
                <Tr key={player.playerId}>
                  <Td>
                    {isCurrentUser
                      ? `You (${player.playerName})`
                      : player.playerName}
                  </Td>
                  <Td isNumeric>{player.correctQuesCount}</Td>
                  <Td isNumeric>{player.inCorrectQuesCount}</Td>
                  <Td isNumeric>
                    {totalQuestions -
                      (player.correctQuesCount + player.inCorrectQuesCount)}
                  </Td>
                  <Td isNumeric>{player.score}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
