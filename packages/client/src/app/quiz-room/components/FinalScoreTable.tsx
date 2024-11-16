import {
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

interface FinalScoreTableProps {
  scores: QuizRoomState["quizGame"]["scores"];
  totalQuestions: number;
}

export function FinalScoreTable({
  scores,
  totalQuestions,
}: FinalScoreTableProps) {
  return (
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
  );
}
