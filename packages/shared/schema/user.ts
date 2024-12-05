import { z } from "zod";
import { Socket } from "socket.io";

export const SocketIdSchema = z.custom<Socket["id"]>();
export const UserIdSchema = SocketIdSchema;
export const UserNameSchema = z
  .string()
  .min(1, { message: "Must be at least 1 character." })
  .max(4, { message: "Must be at most 4 characters." });

export const UserSchema = z
  .object({
    userId: UserIdSchema,
    userName: UserNameSchema,
    socketId: z.custom<Socket["id"]>(),
  })
  .required();
