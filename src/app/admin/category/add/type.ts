import { BOOLEAN_OPTOPNAL, REQUIRED } from "@/app/utils/validation";
import { z } from "zod";

export const categorySchema = z.object({
  active: BOOLEAN_OPTOPNAL,
  name: REQUIRED,
});

export type ICategory = z.infer<typeof categorySchema>;
