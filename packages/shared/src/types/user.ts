import { z } from "zod";
import {
  SocketIdSchema,
  UserIdSchema,
  UserNameSchema,
  UserSchema,
} from "../schema";

export type SocketId = z.infer<typeof SocketIdSchema>;
export type UserId = z.infer<typeof UserIdSchema>;
export type UserName = z.infer<typeof UserNameSchema>;

export type User = z.infer<typeof UserSchema>;
