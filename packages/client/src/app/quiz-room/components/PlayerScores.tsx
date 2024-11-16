import { Heading, Stack, Text } from "@chakra-ui/react";
import { PlayerScoreType } from "@qj/shared";

import { socket } from "@/app/socket";

interface PlayerScoresProps {
  playerScores: PlayerScoreType[];
}

interface PlayerScoreProps {
  playerScore: PlayerScoreType;
  playerId: string;
}

export function PlayerScores({ playerScores }: PlayerScoresProps) {
  return (
    <Stack
      borderLeft="thickLight"
      height="100%"
      width="240px"
      maxWidth="240px"
      p={4}
      spacing={8}
    >
      <Heading fontSize="2xl" as="h4">
        Players
      </Heading>
      {playerScores.map((score) => (
        <PlayerScore
          playerScore={score}
          key={score.playerId}
          playerId={score.playerId}
        />
      ))}
    </Stack>
  );
}

function PlayerScore({ playerScore, playerId }: PlayerScoreProps) {
  const isCurrentUser = playerId === socket.id;
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Text fontSize="2xl" color="orange" fontWeight="extrabold">
        {isCurrentUser
          ? `You (${playerScore.playerName.toLowerCase()})`
          : playerScore.playerName.toLowerCase()}
      </Text>
      <Text fontSize="2xl" color="green" fontWeight="extrabold">
        {playerScore.score}
      </Text>
    </Stack>
  );
}
