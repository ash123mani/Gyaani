"use client";

import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";

import styles from "./styles.module.css";

export default function Home() {
  return (
    <Box as="main" className={styles.main}>
      <Heading as="h1" size="2xl" color="blackAlpha.500">
        Start Playing Quiz
      </Heading>
      <Stack spacing={2} direction="row">
        <Link href="/quiz-room" _hover={{ textDecoration: "none" }}>
          <Button colorScheme="orange" leftIcon={<AddIcon />}>
            Create a quiz room
          </Button>
        </Link>
        <Button colorScheme="blackAlpha" rightIcon={<ArrowForwardIcon />}>
          Join a quiz room
        </Button>
      </Stack>
    </Box>
  );
}
