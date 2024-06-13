/* eslint-disable no-useless-escape */
export const PASSWORD_REGEX = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&-]).{8,30}$/,
);

export const EMAIL_REGEX = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);

export const FULLNAME_REGEX = RegExp(
  /^(?=.{1,20}$)[A-Za-z]+(?:['_.\s][A-Za-z]+)*$/,
);

export const PHONE_NUMBER_REGEX = RegExp(
  /^\+?([0-9]{2,3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/,
);

export const URL_REGEX = RegExp(
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|ftp:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|mailto:[\w\.-]+@\w+\.[a-z]+|tel:\+\d+|https?:\/\/[^\s]+)$/i,
);
export const ONLY_NUMBER_REGEX = RegExp(/^[0-9]*$/);

export const IS_STRING_REGEX = /[a-zA-Z]/g;

export const STRING_AND_NUMBER = RegExp(/^[a-z0-5_.]+$/);

export const NUMBER_REGEX = /^(?!0*(\.0*)?$)([1-9]\d*|0)(\.\d+)?$/;
