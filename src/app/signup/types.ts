import {
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
  VALIDATE_USERNAME,
} from "../utils/validation";
import { z } from "zod";

export const signUpSchema = z.object({
  username: VALIDATE_USERNAME,
  email: VALIDATE_EMAIL,
  password: VALIDATE_PASSWORD,
});

export type ISignUp = z.infer<typeof signUpSchema>;
