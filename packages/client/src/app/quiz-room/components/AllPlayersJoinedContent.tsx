import { Button, Heading, Stack } from "@chakra-ui/react";

interface AllPlayersJoinedContentProps {
  onQuizGameStartClick: () => void;
  isHost: boolean;
}

export function AllPlayersJoinedContent({
  onQuizGameStartClick,
  isHost,
}: AllPlayersJoinedContentProps) {
  return (
    <Stack as="form" gap="8">
      <Heading textAlign="center" fontWeight="bold" color="gray.500">
        {isHost
          ? "Start The Quiz, You are the host"
          : `
          All players are in,
           Host will start the game`}
      </Heading>
      {isHost && (
        <Button onClick={onQuizGameStartClick} size="lg" variant="outline">
          Start Play
        </Button>
      )}
    </Stack>
  );
}
