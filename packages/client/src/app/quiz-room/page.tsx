"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";

import styles from "./styles.module.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateQuizRoomEventData,
  CreateQuizRoomEventDataSchema,
} from "@qj/shared";

export default function QuizRoomPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CreateQuizRoomEventData>({
    resolver: zodResolver(CreateQuizRoomEventDataSchema),
  });

  const onSubmit: SubmitHandler<CreateQuizRoomEventData> = (values) => {
    console.log("here");

    console.log("CreateQuizRoomEventData", values);
  };

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={styles.main}
    >
      <Stack
        spacing={4}
        direction="column"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createQuizRoomForm}
      >
        <FormControl isInvalid={!!errors.userName}>
          <FormLabel htmlFor="userName">Your Player Name</FormLabel>
          <Input
            id="userName"
            placeholder="Your Player Name"
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
        <Button type="submit">Creat Quiz Room</Button>
      </Stack>
    </Box>
  );
}
