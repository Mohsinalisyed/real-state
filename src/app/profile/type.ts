import { OPTOPNAL, REQUIRED } from "../utils/validation";
import { z } from "zod";

export const profileSchema = z.object({
  email: OPTOPNAL,
  username: OPTOPNAL,
  first_name: REQUIRED,
  last_name: REQUIRED,
  address: REQUIRED,
  contact_number: REQUIRED,
  whatsapp_number: REQUIRED,
  profile_image: OPTOPNAL,
  isVerfied: OPTOPNAL,
});

export type IProfile = z.infer<typeof profileSchema>;
