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
  image: OPTOPNAL,
  description: REQUIRED,
  category: REQUIRED,
  sizeAttribute: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  colorAttribute: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});

export type IProduct = z.infer<typeof productSchema>;
