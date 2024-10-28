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
import { ConfirmationModal } from "@/app/components/confirmation-modal/ConfirmationModal";
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

      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" leftIcon={<PlayerIcon />}>
            {pluralize("Player", users.length, true)} in the room
          </Button>
        </PopoverTrigger>
        <PopoverContent color="white" bg="gray.600" borderColor="blue.800">
          <PopoverArrow bg="gray.600" />
          <PopoverCloseButton />
          <PopoverBody>
            <UnorderedList>
              {users.map((user, index) => {
                return (
                  <ListItem key={index} fontSize="md" color="white">
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
