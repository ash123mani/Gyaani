import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  type UseModalProps,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  JoinQuizRoomEventData,
  JoinQuizRoomEventDataSchema,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
  SuccessfullyCreatedQuizRoomEventPayload,
} from "@qj/shared";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "@/app/components/create-quiz-modal/styles.module.css";
import { socket } from "@/app/socket";

interface JoinQuizRoomModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
  onSuccessfulQuizRoomJoin: (
    values: SuccessfullyCreatedQuizRoomEventPayload,
  ) => void;
}

export function JoinQuizRoomModal({
  onClose,
  isOpen,
  onSuccessfulQuizRoomJoin,
}: JoinQuizRoomModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<JoinQuizRoomEventData>({
    resolver: zodResolver(JoinQuizRoomEventDataSchema),
    defaultValues: {
      userName: "",
      quizRoomId: "",
    },
  });

  const onSubmit: SubmitHandler<JoinQuizRoomEventData> = (
    values: JoinQuizRoomEventData,
  ) => {
    socket.emit<QuizRoomClientToServerEvent>("JoinQuizRoom", values);
    socket.on<QuizRoomServerToClientEvents>(
      "SuccessfullyJoinedQuizRoom",
      onSuccessfulQuizRoomJoin,
    );
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createQuizRoomForm}
        as="form"
      >
        <ModalContent>
          <ModalHeader>Join Existing Quiz Room</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack direction="column" spacing={4}>
              <FormControl isInvalid={!!errors.userName}>
                <FormLabel htmlFor="userName">Room Code</FormLabel>
                <Input
                  id="quizRoomId"
                  placeholder="Quiz Room Code"
                  colorScheme="red"
                  {...register("quizRoomId")}
                />
                {errors.quizRoomId?.message && (
                  <FormErrorMessage>
                    {errors.quizRoomId!.message as string}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.quizRoomId}>
                <FormLabel htmlFor="userName">Your Player name</FormLabel>
                <Input
                  id="userName"
                  placeholder="MSD (Mahi)"
                  colorScheme="red"
                  {...register("userName")}
                />
                {errors.userName?.message && (
                  <FormErrorMessage>
                    {errors.userName!.message as string}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit">Join Room</Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
}
