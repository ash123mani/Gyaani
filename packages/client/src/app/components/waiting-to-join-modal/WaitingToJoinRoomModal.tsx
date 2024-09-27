import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useClipboard,
  UseModalProps,
} from "@chakra-ui/react";
import { Fragment, useMemo, useRef } from "react";

interface WaitingToJoinRoomModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
  roomId: string;
  quizGameReadyToStart: boolean;
  onQuizGameStartClick: () => void;
}

export function WaitingToJoinRoomModal({
  isOpen,
  onClose,
  roomId,
  quizGameReadyToStart,
  onQuizGameStartClick,
}: WaitingToJoinRoomModalProps) {
  const prevRoomIdRef = useRef("");
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  if (prevRoomIdRef.current !== roomId && roomId) {
    prevRoomIdRef.current = roomId;
    setValue(roomId);
  }

  const waitingForPlayersToJoinRoomContent = useMemo(
    () => (
      <Fragment>
        <Box>
          <Text
            fontSize="2xl"
            align="center"
            fontWeight="bold"
            color="gray.500"
          >
            Quiz will automatically start once all the players will join the
            rom.
          </Text>
        </Box>

        <FormControl>
          <FormLabel>Room Code</FormLabel>
          <InputGroup>
            <InputRightElement width="auto">
              <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
            </InputRightElement>
            <Input placeholder={roomId} value={value} mr={2} />
          </InputGroup>
          <FormHelperText color="green">
            Share it with your friends to join the room and play.
          </FormHelperText>
        </FormControl>

        <Text
          fontSize="2xl"
          align="center"
          fontWeight="bold"
          color="red.400"
          width="100%"
        >
          Do not Close!
        </Text>
      </Fragment>
    ),
    [hasCopied, onCopy, roomId, value],
  );

  const startQuizGameContent = useMemo(
    () => (
      <Fragment>
        <Text fontSize="2xl" align="center" fontWeight="bold" color="gray.500">
          All the Players has been joined
        </Text>
      </Fragment>
    ),
    [],
  );

  return (
    <Modal
      isCentered
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Quiz Room Created</ModalHeader>
        <ModalBody>
          <Stack direction="column" spacing={4} alignItems="baseline">
            {quizGameReadyToStart
              ? startQuizGameContent
              : waitingForPlayersToJoinRoomContent}
          </Stack>
        </ModalBody>
        {quizGameReadyToStart}
        <ModalFooter>
          {quizGameReadyToStart ? (
            <Button onClick={onQuizGameStartClick}>Start Quiz Game</Button>
          ) : (
            <Button variant="ghost" colorScheme="red" onClick={onClose}>
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
