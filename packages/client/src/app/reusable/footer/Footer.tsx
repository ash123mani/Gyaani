"use client";

import { Box } from "@chakra-ui/react";

import styles from "./styles.module.css";

export function Footer() {
  return (
    <Box
      as="footer"
      className={styles.footer}
      borderRadius="md"
      color="gray.50"
    >
      <p>&copy; Gyaani Quiz</p>
    </Box>
  );
}
