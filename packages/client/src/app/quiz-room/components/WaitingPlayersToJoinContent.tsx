import { Fragment, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";

interface WaitingPlayersToJoinContentProps {
  roomId: string;
}

export function WaitingPlayersToJoinContent({
  roomId,
}: WaitingPlayersToJoinContentProps) {
  const { onCopy, value, setValue, hasCopied } = useClipboard(roomId);
  const prevRoomIdRef = useRef("");

  if (prevRoomIdRef.current !== roomId && roomId) {
    prevRoomIdRef.current = roomId;
    setValue(roomId);
  }

  return (
    <Stack gap={8} justifyContent="center" alignItems="center">
      <Box maxWidth="80%">
        <Text fontSize="3xl" align="center" fontWeight="bold" color="gray.500">
          Quiz will automatically start once all the players will join the rom.
        </Text>
      </Box>

      <FormControl maxWidth="80%">
        <FormLabel>Room Code</FormLabel>
        <InputGroup>
          <InputRightElement width="auto">
            <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
          </InputRightElement>
          <Input placeholder={roomId} defaultValue={value} ml={2} />
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
  );
}
