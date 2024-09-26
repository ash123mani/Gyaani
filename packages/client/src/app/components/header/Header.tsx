"use client";

import { Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { AppLogo } from "@/app/components/icons/AppLogo";

import styles from "./styles.module.css";

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
