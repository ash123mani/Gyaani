"use client";

import { Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import styles from "./styles.module.css";
import { AppLogo } from "@/app/components/icons/AppLogo";

export function Header() {
  return (
    <Box
      as="header"
      className={styles.header}
      border="thickDark"
      borderRadius="md"
    >
      <Link href="/" _hover={{ textDecoration: "none", colorScheme: "orange" }}>
        <AppLogo />
      </Link>
    </Box>
  );
}
