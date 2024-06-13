import { VALIDATE_EMAIL, VALIDATE_PASSWORD } from "../utils/validation";
import { z } from "zod";

export const logInSchema = z.object({
  email: VALIDATE_EMAIL,
  password: VALIDATE_PASSWORD,
});

export type ILogIn = z.infer<typeof logInSchema>;
