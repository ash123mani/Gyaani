import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { PlayerScoreType } from "@qj/shared";

interface PlayerScoresProps {
  playerScores: PlayerScoreType[];
}

interface PlayerScoreProps {
  playerScore: PlayerScoreType;
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
        <PlayerScore playerScore={score} key={score.playerId} />
      ))}
    </Stack>
  );
}

function PlayerScore({ playerScore }: PlayerScoreProps) {
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Text fontSize="2xl" color="orange" fontWeight="extrabold">
        {playerScore.playerName}
      </Text>
      <Text fontSize="2xl" color="green">
        {playerScore.score}
      </Text>
    </Stack>
  );
}
