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
  location: REQUIRED,
  addressline1:REQUIRED,
  addressline2:REQUIRED,
  city: REQUIRED,
  country: REQUIRED,
  size:REQUIRED,
  image: z.array(z.string()).optional(),
  description: REQUIRED,
  category: REQUIRED,
});

export type IProduct = z.infer<typeof productSchema>;
