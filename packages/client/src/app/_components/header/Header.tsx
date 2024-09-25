import { Box, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import styles from "./styles.module.css";

export function Header() {
  return (
    <Box
      as="header"
      className={styles.header}
      border="thickDark"
      borderRadius="md"
    >
      <Link
        as={NextLink}
        href="/"
        _hover={{ textDecoration: "none" }}
        color="teal.600"
        fontSize="xl"
        fontWeight="semibold"
      >
        <Button>Gyaani Quiz</Button>
      </Link>
    </Box>
  );
}
