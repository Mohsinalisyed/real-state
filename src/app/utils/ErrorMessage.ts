export enum ErrorMessage {
  INVALID_Email = "Please enter valid email.",
  VALID_MNEMONIC = "Please enter valid mnemonic.",
  USER_NOT_FOUND = "User not found.",
  INVALID_PASSWORD = "Use mix of 8 letters, numbers & symbols.",
  INVALID_LOGIN_PASSWORD = "Please enter valid password.",
  PASSWORD_NOT_MATCH = "Password doesn't match.",
  INVALID_FULLNAME = "Please enter valid name.",
  INVALID_PHONE_NUMBER = "Please enter valid phone number.",
  REQUIRED = "This field is required.",
  NUMERIC = "This field must be numeric.",
  BOOLEAN = "This field must be boolean",
  IMAGE_MAX_SIZE = "Max file size is 3MB.",
  IMAGE_MAX_SIZE_100 = "Max file size is 100MB.",
  IMAGE_MAX_SIZE_10 = "File size should be less than 10MB",
  INVALID_USERNAME = "Username can only contain a-z, 1-5.",
  INVALID_USERNAME_LENGTH = "Username must be between 1 to 12 characters.",
  INVALID_IMAGE_TYPE = ".jpg, .jpeg, .png and .webp files are accepted.",
  INVALID_FILE_TYPE = '".csv", "text/csv" files are accepted.',
  INVALID_LENGTH_CSV = "Only allowed to upload 1 CSV",
  INVALID_URL = "Please enter valid url.",
  INVALID_2FA = "Please enter valid verification code.",
  DESCRIPTION_MAX_LENGTH = "Description should be less than 255 characters.",
  DESCRIPTION_MAX_LENGTH_PRODUCT = "Description should be less than 400 characters.",
  DESCRIPTION_MAX_LENGTH_DISPUTE = "Description should be less than 500 characters.",
  DESCRIPTION_MAX_LENGTH_FEEDBACK = "Feedback should be less than 500 characters.",
  DESCRIPTION_MAX_LENGTH_FEEDBACK_MAX = "Feedback should be less than 2000 characters.",
  DESCRIPTION_MAX_LENGTH_FEEDBACK_MAX_USER = "Description should be less than 2000 characters.",
  DESCRIPTION_DETAILS_MAX_LENGTH = "Description should be less than 10000 characters.",
  REASON_MIN_LENGTH = "Reason must be at least 3 characters long.",
  REASON_MAX_LENGTH = "Reason should be less than 500 characters.",
  DESCRIPTION_MIN_LENGTH = "Description  must be at least 3 characters long.",
  VAlIDATE_DESCRIPTION_DISPUTE_USER_MAX = "Reason should be less than 250 characters.",
  VAlIDATE_DESCRIPTION_DISPUTE_USER_MIN = "Reason must be at least 3 characters long.",
  ADDRESS_ADDED_SUCCESSFULLY = "Address added successfully.",
  ADDRESS_UPDATE_SUCCESSFULLY = "Address updated successfully.",
  ADDRESS_DELETE_SUCCESSFULLY = "Address deleted successfully.",
  FIELD_REQUIRED = "Please enter the &t",
  FROM_DATE_ERROR = "Start date must be greater than current date.",
  To_DATE_ERROR = "End date must be greater than start date.",
  PRODUCT_ALREADY_EXIST = "Product already exist.",
  ATTRIBUTE_REQUIRED = "Attribute must belongs to Category.",
  KEYWORD_MAX_LENGTH = "Total keywords that can be added will be 50.",
  KEYWORD_CHAR_LENGTH = "Keywords must be under 20 characters long.",
  PRODUCT_DELETE_SUCCESSFULLY = "Product deleted successfully.",
  MAX_VALUE_LIMIT_IS_REQUIRED = "Minimum Value Limit is required",
  MIN_VALUE_LIMIT_IS_REQUIRED = "Minimum Value Limit is required",
  SHIPPING_CHARGE_IS_REQUIRED = "Shipping Charge is required",
  DELETE_RATES = "Shipping Rate deleted",
  SELECT_SHIPING_METHOD = "Please select shipping method",
  INSUFFICIENT_BALANCE = "Insufficient balance",
  PRODUCT_VARIANTS_VALIDATION = "Please fill all the fields in variant table",
  PRODUCT_IMAGES_VALIDATION = "Please upload images against selected attributes",
  MANDATORY_VALIDATION = "These attributes are mandatory (&t)",
  SELECT_PRICE_TYPE = "Select Price Type",
  ADD_PRICE = "Add Price",
  ADD_QUANTITY = "Add Quantity",
  ADD_SKU = "Add SKU",
  SKU_LENGTH = "Length must be at least 4",
  ATTRIBUTE_VALIDATION = "Please select attributes",
  MAX_ATTACHMENTS = "You can upload a maximmum of 6 attachments",
  ATTRIBUTE_NAME = "Name must be 50 characters long",
  DUPLICATE_ATTRIBUTE = "Duplicate attribute",
  MULTIPLE_CSV = "Multiple CSV not allowed",
  TAG_LENGTH = "Tag should be less than 20 characters.",
  TAG_ALREADY_EXISTS = "Tag already exists.",
  TAGS_MAX_LENGTH = "Total tags that can be added will be 10.",
  SHIP_SUCCESS = "Your order has been shipped successfully.",
  INVALID_VIDEO_TYPE = ".mp4, .ogg, .webm files are accepted.",
  ONE_ATTRIBUTE = "In pool product, only one attribute is allowed.",
  ONE_ATTRIBUTES_REQUIRED = "At least one attribute is required.",
  NON_ZERO = "Value must be greater than zero.",
}
