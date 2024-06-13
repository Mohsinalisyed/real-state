import { z } from "zod";
import { ErrorMessage } from "./ErrorMessage";
import { accpetedImageType } from "./types";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  FULLNAME_REGEX,
  URL_REGEX,
  STRING_AND_NUMBER,
  NUMBER_REGEX,
} from "./regex";

export const VALIDATE_EMAIL = z
  .string()
  .regex(EMAIL_REGEX, { message: ErrorMessage?.INVALID_Email });

export const VALIDATE_PASSWORD = z
  .string()
  .regex(PASSWORD_REGEX, { message: ErrorMessage?.INVALID_PASSWORD });

export const LOGIN_VALIDATE_PASSWORD = z
  .string()
  .min(1, { message: ErrorMessage?.INVALID_LOGIN_PASSWORD });

export const VALIDATE_FULLNAME = z
  .string()
  .regex(FULLNAME_REGEX, { message: ErrorMessage?.INVALID_FULLNAME });

export const VALIDATE_OPTIONAL_FULLNAME = z
  .string()
  .regex(FULLNAME_REGEX, { message: ErrorMessage?.INVALID_FULLNAME })
  .optional()
  .or(z.literal(""));

// validate phone number with required
export const VALIDATE_PHONE_NUMBER = z
  .string()
  .regex(PHONE_NUMBER_REGEX, { message: ErrorMessage?.INVALID_PHONE_NUMBER });

// validate phone number with optional
export const VALIDATE_OPTIONAL_PHONE_NUMBER = z
  .string()
  .regex(PHONE_NUMBER_REGEX, { message: ErrorMessage?.INVALID_PHONE_NUMBER })
  .optional()
  .or(z.literal(""));

export const VALIDATE_PIN_CODE = z
  .number({ invalid_type_error: ErrorMessage?.NUMERIC })
  .min(1, { message: ErrorMessage?.REQUIRED });

export const REQUIRED = z
  .string()
  .nonempty({ message: ErrorMessage?.REQUIRED });

export const NUMBER = z.number();

export const VALIDATE_CITY = z.object(
  { id: z.number(), label: z.string() },
  { invalid_type_error: ErrorMessage?.REQUIRED },
);

export const VALIDATE_STATE = z.object(
  { id: z.number(), label: z.string() },
  { invalid_type_error: ErrorMessage?.REQUIRED },
);

export const OPTOPNAL = z.string().optional();
export const OPTIONAL_NUMBER = z.number().optional();

export const NON_ZERO_REQUIRED = z.string().refine(
  (value) => {
    return NUMBER_REGEX.test(value.toString());
  },
  {
    message: ErrorMessage.NON_ZERO,
  },
);
export const NON_ZERO_OPTIONAL_NUMBER = z
  .string()
  .refine(
    (value) => {
      return value === "" || NUMBER_REGEX.test(value.toString());
    },
    {
      message: ErrorMessage.NON_ZERO,
    },
  )
  .optional();

export const BOOLEAN = z.boolean({ invalid_type_error: ErrorMessage.BOOLEAN });

// validate web url with required
export const VALIDATE_WEB_URL = z
  .string()
  .regex(URL_REGEX, { message: ErrorMessage.INVALID_URL });
// validate web url with optinal
export const VALIDATE_WEB_URL_OPTIONAL = z
  .string()
  .regex(URL_REGEX, { message: ErrorMessage.INVALID_URL })
  .optional()
  .or(z.literal(""));
// validate web url with optional
export const VALIDATE_WEBSITE = z
  .string()
  .regex(URL_REGEX, { message: ErrorMessage.INVALID_URL })
  .optional()
  .or(z.literal(""));

export const BOOLEAN_OPTOPNAL = z
  .boolean({ invalid_type_error: ErrorMessage.BOOLEAN })
  .optional();

export const VALIDATE_ONLY_NUMBER = z
  .number()
  .min(1, { message: ErrorMessage?.REQUIRED });

export const VALIDATE_IMAGE = z.union([
  z
    .custom<FileList>()
    .refine((files) => files?.length === 1, ErrorMessage?.REQUIRED) // check if file is selected
    .refine(
      (files) => files?.[0]?.size <= 3000000,
      ErrorMessage?.IMAGE_MAX_SIZE,
    ) // check file size
    .refine(
      (files) => accpetedImageType.includes(files?.[0]?.type),
      ErrorMessage?.INVALID_IMAGE_TYPE,
    ),
  z.string(),
]);
export const VALIDATE_MULTIPLE_IMAGES = z.union([
  z
    .custom<FileList>()
    .refine((files) => files?.length >= 1, ErrorMessage?.REQUIRED) // check if file is selected
    .refine(
      (files) => files?.[0]?.size <= 3000000,
      ErrorMessage?.IMAGE_MAX_SIZE,
    ) // check file size
    .refine(
      (files) => accpetedImageType.includes(files?.[0]?.type),
      ErrorMessage?.INVALID_IMAGE_TYPE,
    ),
  z.string().optional(),
]);

export const VAlIDATE_KEYWORDS = z
  .string()
  .min(1, { message: ErrorMessage?.REQUIRED })
  .refine((value) => {
    const keywords = value.split(" ");
    return keywords.length <= 54;
  }, ErrorMessage?.KEYWORD_MAX_LENGTH)
  .refine((value) => {
    const keywords = value.split(" ");
    return keywords.every((keyword) => keyword.length <= 20);
  }, ErrorMessage?.KEYWORD_CHAR_LENGTH)
  .optional()
  .or(z.literal(""));

export const VAlIDATE_DESCRIPTION = z
  .string()
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(255, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH })
  .optional()
  .or(z.literal(""));
export const VAlIDATE_DESCRIPTION_PRODUCT_REQUEST = z
  .string()
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(400, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_PRODUCT })
  .optional()
  .or(z.literal(""));
export const PRODUCT_REQUEST_REQUIRED = z
  .string()
  .min(1, { message: ErrorMessage?.REQUIRED })
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(400, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_PRODUCT });

export const VAlIDATE_DESCRIPTION_FEEDBACK = z
  .string()
  .min(1, { message: ErrorMessage?.REQUIRED })
  .max(2000, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_FEEDBACK_MAX });
export const VAlIDATE_DESCRIPTION_FEEDBACK_USER = z
  .string()
  .min(1, { message: ErrorMessage?.REQUIRED })
  .max(2000, {
    message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_FEEDBACK_MAX_USER,
  });
export const VAlIDATE_DESCRIPTION_DISPUTE = z
  .string()
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(500, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_DISPUTE });
export const VAlIDATE_DESCRIPTION_DISPUTE_USER = z
  .string()
  .min(3, { message: ErrorMessage?.VAlIDATE_DESCRIPTION_DISPUTE_USER_MIN })
  .max(250, { message: ErrorMessage?.VAlIDATE_DESCRIPTION_DISPUTE_USER_MAX });
export const FEEDBACK_REQUIRED = z
  .string()
  .min(1, { message: ErrorMessage?.REQUIRED })
  .min(3, { message: ErrorMessage?.VAlIDATE_DESCRIPTION_DISPUTE_USER_MIN })
  .max(400, { message: ErrorMessage?.VAlIDATE_DESCRIPTION_DISPUTE_USER_MAX });

export const VAlIDATE_COLLECTION_DESCRIPTION = z
  .string()
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(500, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_DISPUTE })
  .optional()
  .or(z.literal(""));

export const VAlIDATE_PRODUCT_DESCRIPTION_DETAILS = z
  .string()
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(10000, { message: ErrorMessage?.DESCRIPTION_DETAILS_MAX_LENGTH })
  .optional()
  .or(z.literal(""));

export const VAlIDATE_DESCRIPTION_LENGTH = z
  .string()
  .nonempty({ message: ErrorMessage?.REQUIRED })
  .min(3, { message: ErrorMessage?.DESCRIPTION_MIN_LENGTH })
  .max(500, { message: ErrorMessage?.DESCRIPTION_MAX_LENGTH_DISPUTE });

export const VAlIDATE_REASON_LENGTH = z
  .string()
  .nonempty({ message: ErrorMessage?.REQUIRED })
  .min(3, { message: ErrorMessage?.REASON_MIN_LENGTH })
  .max(500, { message: ErrorMessage?.REASON_MAX_LENGTH });

export const VAlIDATE_MODAL_REASONS = z
  .string()
  .nonempty({ message: ErrorMessage?.REQUIRED })
  .max(500, { message: ErrorMessage?.REASON_MAX_LENGTH });

export const REQUIRED_DESCRIPTION = z
  .string()
  .min(1, { message: ErrorMessage?.REQUIRED });
export const VALIDATE_COUNTRY = z.object({ id: z.number(), label: z.string() });
export const VALIDATE_OPTIONAL_COUNTRY = z
  .object({ id: z.number(), label: z.string() })
  .optional()
  .nullable();
export const VALIDATE_USERNAME = z
  .string()
  .min(1, { message: ErrorMessage?.INVALID_USERNAME_LENGTH })
  .max(12, { message: ErrorMessage?.INVALID_USERNAME_LENGTH })
  .regex(STRING_AND_NUMBER, { message: ErrorMessage?.INVALID_USERNAME });
export const MAX_KEYWORDS = z
  .string()
  .trim()
  .min(1, { message: ErrorMessage?.REQUIRED })
  .max(50, { message: ErrorMessage?.ATTRIBUTE_NAME });

export const VALIDATE_SKU = z
  .string()
  .min(4, { message: ErrorMessage?.SKU_LENGTH })
  .optional();
