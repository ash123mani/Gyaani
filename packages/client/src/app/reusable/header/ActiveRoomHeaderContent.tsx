import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import pluralize from "pluralize";
import {
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  QuizRoomState,
} from "@qj/shared";
import { useParams, useRouter } from "next/navigation";

import { socket } from "@/app/socket";
import { ConfirmationModal } from "@/app/reusable/confirmation-modal/ConfirmationModal";
import { ExitIcon, PlayerIcon } from "@/app/icons";

export const ActiveRoomHeaderContent = () => {
  const router = useRouter();
  const params = useParams<{ roomId: string }>();
  const [users, setUsers] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    socket.on<QuizRoomServerToClientEvents>("QuizRoomState", updateUsers);
    socket.on<QuizRoomServerToClientEvents>(
      "SuccessfullyJoinedQuizRoom",
      updateUsers,
    );
  }, []);

  function updateUsers(quizRoomState: QuizRoomState) {
    setUsers(quizRoomState.users);
  }

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

      <Popover trigger="hover" placement="bottom-end">
        <PopoverTrigger>
          <Button variant="ghost" leftIcon={<PlayerIcon />}>
            {pluralize("player", users.length, true)} in the room
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="pink.100">
          <PopoverArrow bg="pink.100" />
          <PopoverBody>
            <UnorderedList>
              {users.map((user, index) => {
                return (
                  <ListItem key={index} fontSize="md" color="blackAlpha.900">
                    {user}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      </Popover>

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
