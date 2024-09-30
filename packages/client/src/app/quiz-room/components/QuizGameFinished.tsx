import { Box, Heading } from "@chakra-ui/react";

export function QuizGameFinished() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      <Heading
        as="h2"
        size="2xl"
        color="gray.400"
        textAlign="center"
        colorScheme="orange"
      >
        Game Finished
      </Heading>
    </Box>
  );
}
