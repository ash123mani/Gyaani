import {
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  type UseModalProps,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateQuizRoomEventData,
  CreateQuizRoomEventDataSchema,
} from "@qj/shared";

import { QuizRoomIcon } from "@/app/icons";

import styles from "./styles.module.css";

interface CreateQuizModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
  onCreateQuizRoomSubmit: SubmitHandler<CreateQuizRoomEventData>;
  quizGameId: string;
}

export function CreateQuizModal({
  onClose,
  isOpen,
  onCreateQuizRoomSubmit,
  quizGameId,
}: CreateQuizModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<CreateQuizRoomEventData>({
    resolver: zodResolver(CreateQuizRoomEventDataSchema),
    defaultValues: {
      maxPlayersAllowed: 1,
      userName: "",
      quizGameId,
    },
  });
  const maxPlayersAllowed = watch("maxPlayersAllowed");

  if (getValues("quizGameId") !== quizGameId) {
    setValue("quizGameId", quizGameId);
  }

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />

      <ModalContent
        as="form"
        onSubmit={handleSubmit(onCreateQuizRoomSubmit)}
        className={styles.createQuizRoomForm}
      >
        <ModalHeader>Create a new Quiz Room</ModalHeader>
        <Divider />
        <ModalCloseButton />

        <ModalBody py={4}>
          <FormControl
            isInvalid={!!errors.userName}
            visibility="hidden"
            height="0"
            width="0"
          >
            <FormLabel htmlFor="quizGameId">Your Player Name</FormLabel>
            <Input
              id="quizGameId"
              placeholder="Quiz Game Id"
              colorScheme="red"
              {...register("quizGameId")}
            />
          </FormControl>
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
                min={1}
                onChange={(valueAsString, valueAsNumber) => {
                  setValue(
                    "maxPlayersAllowed",
                    isNaN(valueAsNumber) ? 1 : valueAsNumber,
                  );
                }}
                name="maxPlayersAllowed"
                value={maxPlayersAllowed}
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

        <Divider />

        <ModalFooter py={4}>
          <Button type="submit" leftIcon={<QuizRoomIcon />}>
            Creat Quiz Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
