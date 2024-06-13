import { BOOLEAN_OPTOPNAL, OPTOPNAL } from "@/app/utils/validation";
import { z } from "zod";

export const sliderSchema = z.object({
  active: BOOLEAN_OPTOPNAL,
  caption: OPTOPNAL,
  imageUrl: OPTOPNAL,
});

export type ISlider = z.infer<typeof sliderSchema>;
