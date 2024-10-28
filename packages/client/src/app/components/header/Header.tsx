"use client";

import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useParams, useRouter } from "next/navigation";
import { Fragment } from "react";

import { AppLogo } from "@/app/components/icons/AppLogo";
import { ConfirmationModal } from "@/app/components/confirmation-modal/ConfirmationModal";
import { socket } from "@/app/socket";

import styles from "./styles.module.css";

export function Header() {
  const router = useRouter();
  const params = useParams<{ roomId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isQuizRoomActive = !!params.roomId;

  const handleSocketDisconnect = () => {
    socket.disconnect();
    onClose();
    router.push("/");
  };

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
          <Button colorScheme="red" onClick={onOpen} variant="outline">
            Leave Room
          </Button>
        ) : (
          <Link
            href="/"
            _hover={{ textDecoration: "none", colorScheme: "orange" }}
          >
            <AppLogo />
          </Link>
        )}
      </Box>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSocketDisconnect}
        title="Are you sure to leave the room?"
        description="On confirming you will leave the room."
      />
    </Fragment>
  );
}
