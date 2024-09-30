import { Box, Button, Text } from "@chakra-ui/react";

interface AllPlayersJoinedContentProps {
  onQuizGameStartClick: () => void;
}

export function AllPlayersJoinedContent({
  onQuizGameStartClick,
}: AllPlayersJoinedContentProps) {
  return (
    <Box as="form">
      <Text fontSize="2xl" align="center" fontWeight="bold" color="gray.500">
        All the Players has been joined
      </Text>
      <Button onClick={onQuizGameStartClick}>Start Quiz Game</Button>
    </Box>
  );
}
