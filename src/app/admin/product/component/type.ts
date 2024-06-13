import {
  NON_ZERO_REQUIRED,
  OPTIONAL_NUMBER,
  OPTOPNAL,
  REQUIRED,
} from "@/app/utils/validation";
import { z } from "zod";

export const productSchema = z.object({
  productId: OPTIONAL_NUMBER,
  name: REQUIRED,
  price: NON_ZERO_REQUIRED,
  quantity: NON_ZERO_REQUIRED,
  image: z.array(z.string()).optional(),
  description: REQUIRED,
  category: OPTOPNAL,
});

export type IProduct = z.infer<typeof productSchema>;
