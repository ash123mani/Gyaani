import { Box, Button, Heading, Stack } from "@chakra-ui/react";

import styles from "./styles.module.css";

export default function Home() {
  return (
    <Box as="main" className={styles.main}>
      <Heading as="h1" size="2xl" color="blackAlpha.500">
        Start Playing Quiz
      </Heading>
      <Stack spacing={2} direction="row">
        <Button colorScheme="orange">Create a quiz room</Button>
        <Button colorScheme="blackAlpha">Join a quiz room</Button>
      </Stack>
    </Box>
  );
}
