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
import { useRef } from "react";

interface WaitingToJoinRoomModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
  roomId: string;
}

export function WaitingToJoinRoomModal({
  isOpen,
  onClose,
  roomId,
}: WaitingToJoinRoomModalProps) {
  const prevRoomIdRef = useRef("");
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  if (prevRoomIdRef.current !== roomId && roomId) {
    prevRoomIdRef.current = roomId;
    setValue(roomId);
  }

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
                  <Button onClick={onCopy}>
                    {hasCopied ? "Copied!" : "Copy"}
                  </Button>
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
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
