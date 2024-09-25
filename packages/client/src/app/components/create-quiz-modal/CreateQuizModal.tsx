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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  UseModalProps,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateQuizRoomEventData,
  CreateQuizRoomEventDataSchema,
  QuizRoomClientToServerEvent,
  QuizRoomServerToClientEvents,
} from "@qj/shared";

import styles from "./styles.module.css";
import { socket } from "@/app/socket";
import { useEffect } from "react";

interface CreateQuizModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
  // TODO: Fix the type for Web Socket message body
  onSuccessfulQuizRoomCreation: (values: object) => void;
}

export function CreateQuizModal({
  onClose,
  isOpen,
  onSuccessfulQuizRoomCreation,
}: CreateQuizModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CreateQuizRoomEventData>({
    resolver: zodResolver(CreateQuizRoomEventDataSchema),
  });

  useEffect(() => {
    socket.connect();
  }, []);

  const onSubmit: SubmitHandler<CreateQuizRoomEventData> = (values) => {
    socket.emit<QuizRoomClientToServerEvent>("CreateQuizRoom", values);
    socket.on<QuizRoomServerToClientEvents>(
      "SuccessfullyCreatedQuizRoom",
      onSuccessfulQuizRoomCreation,
    );
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createQuizRoomForm}
        as="form"
      >
        <ModalContent>
          <ModalHeader>Create Quiz Room</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack direction="column" spacing={4}>
              <FormControl isInvalid={!!errors.userName}>
                <FormLabel htmlFor="userName">Your Player Name</FormLabel>
                <Input
                  id="userName"
                  placeholder="Your Player Name"
                  colorScheme="red"
                  {...register("userName")}
                />
                {errors.userName?.message && (
                  <FormErrorMessage>
                    {errors.userName!.message as string}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.maxPlayersAllowed}>
                <FormLabel htmlFor="maxPlayersAllowed">
                  Number of Allowed Players
                </FormLabel>
                <NumberInput
                  id="maxPlayersAllowed"
                  inputMode="numeric"
                  onChange={(valueAsString, valueAsNumber) => {
                    setValue("maxPlayersAllowed", valueAsNumber);
                  }}
                  name="maxPlayersAllowed"
                  value={getValues("maxPlayersAllowed")}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {errors.maxPlayersAllowed?.message && (
                  <FormErrorMessage>
                    {errors.maxPlayersAllowed!.message as string}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit">Creat Quiz Room</Button>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  );
}
