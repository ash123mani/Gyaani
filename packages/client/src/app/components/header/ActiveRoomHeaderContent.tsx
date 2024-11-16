import { Fragment } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { QuizRoomClientToServerEvent } from "@qj/shared";

import { socket } from "@/app/socket";
import { ConfirmationModal } from "@/app/components/ConfirmationModal";
import { ExitIcon } from "@/app/icons";

export const ActiveRoomHeaderContent = () => {
  const router = useRouter();
  const params = useParams<{ roomId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSocketDisconnect = () => {
    socket.emit<QuizRoomClientToServerEvent>("LeaveQuizRoom", {
      roomId: params.roomId,
    });
    onClose();
    router.push("/");
  };

  return (
    <Fragment>
      <Button
        colorScheme="red"
        onClick={onOpen}
        variant="outline"
        leftIcon={<ExitIcon />}
      >
        Leave Room
      </Button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSocketDisconnect}
        title="Are you sure to leave the room?"
        description="On confirming you will leave the room."
      />
    </Fragment>
  );
};
