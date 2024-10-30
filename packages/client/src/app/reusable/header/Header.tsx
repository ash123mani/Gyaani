"use client";

import { Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useParams, useRouter } from "next/navigation";
import { Fragment } from "react";

import { AppLogo } from "@/app/reusable/AppLogo";
import { ActiveRoomHeaderContent } from "@/app/reusable/header/ActiveRoomHeaderContent";

import styles from "./styles.module.css";

export function Header() {
  const params = useParams<{ roomId: string }>();

  const isQuizRoomActive = !!params.roomId;
  return (
    <Fragment>
      <Box
        as="header"
        className={styles.header}
        border="thickDark"
        borderRadius="md"
        display="flex"
        justifyContent="space-between"
      >
        {isQuizRoomActive ? (
          <ActiveRoomHeaderContent />
        ) : (
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <AppLogo />
          </Link>
        )}
      </Box>
    </Fragment>
  );
}
