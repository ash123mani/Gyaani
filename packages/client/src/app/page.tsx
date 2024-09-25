import { Box, Button, Heading, Link, Stack } from "@chakra-ui/react";

import styles from "./styles.module.css";
import NextLink from "next/link";

export default function Home() {
  return (
    <Box as="main" className={styles.main}>
      <Heading as="h1" size="2xl" color="blackAlpha.500">
        Start Playing Quiz
      </Heading>
      <Stack spacing={2} direction="row">
        <Link
          as={NextLink}
          href="/quiz-room"
          _hover={{ textDecoration: "none" }}
        >
          <Button colorScheme="orange">Create a quiz room</Button>
        </Link>
        <Button colorScheme="blackAlpha">Join a quiz room</Button>
      </Stack>
    </Box>
  );
}
