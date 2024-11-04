import {
  Box,
  Button,
  Divider,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinQuizRoomEventData, JoinQuizRoomEventDataSchema } from "@qj/shared";

import styles from "@/app/components/create-quiz-modal/styles.module.css";
import { AddPlayerIcon } from "@/app/icons/AddPlayerIcon";

interface JoinQuizRoomModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
  onJoinQuizRoomSubmit: SubmitHandler<JoinQuizRoomEventData>;
}

export function JoinQuizRoomModal({
  onClose,
  isOpen,
  onJoinQuizRoomSubmit,
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
        onSubmit={handleSubmit(onJoinQuizRoomSubmit)}
        className={styles.createQuizRoomForm}
        as="form"
      >
        <ModalContent>
          <ModalHeader>Join Existing Quiz Room</ModalHeader>
          <Divider />

          <ModalCloseButton />

          <ModalBody py={4}>
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

          <Divider />

          <ModalFooter py={4}>
            <Button
              type="submit"
              colorScheme="cyan"
              leftIcon={<AddPlayerIcon />}
            >
              Join Room
            </Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
}
