import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadimage/core";

export const toUpperFirst = (str: string) =>
  str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : str;

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Dates
const MonthsLabelMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatDayLabel(timestamp: number) {
  const date = new Date(timestamp);
  return `${MonthsLabelMap[date.getMonth()]} ${date.getDate()}`;
}
export const foramtMintueSecond = (d: number) => {
  d = Number(d);

  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const mDisplay = m > 0 ? m + (m === 1 ? ": " : " : ") : "00";
  const sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "00";
  return mDisplay + ":" + sDisplay;
};

export const formatHoursMinutesSeconds = (d: number) => {
  d = Number(d);

  const day = Math.floor(d / (3600 * 24));
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const dayDisplay = day > 0 ? day + (day === 1 ? ":" : ":") : "00" + ":";
  const hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : "00" + ":";
  const mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "00" + ":";
  const sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "00";
  return dayDisplay + hDisplay + mDisplay + sDisplay;
};
export const formatValuesHoursMinutesSeconds = (d: number) => {
  d = Number(d);

  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) : "00";
  const mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) : "00";
  const sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) : "00";
  return {
    hDisplay,
    mDisplay,
    sDisplay,
  };
};

export const formatDate = (d: string) => {
  const date = new Date(d);
  const yyyy = date.getUTCFullYear().toString().slice(-2); // Extract the last two digits
  let mm: string | number = date.getMonth() + 1; // Months start at 0!
  let dd: string | number = date.getDate();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  return d ? formattedDate : "-";
};

export const formatDateAndTime = (dateTime: string) => {
  const resultDateTime = new Date(dateTime);

  // Extract the date components
  const day = String(resultDateTime.getDate()).padStart(2, "0");
  const month = String(resultDateTime.getMonth() + 1).padStart(2, "0");
  const year = resultDateTime.getFullYear();
  const hours = String(resultDateTime.getHours()).padStart(2, "0");
  const minutes = String(resultDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(resultDateTime.getSeconds()).padStart(2, "0");

  // Create the formatted date string
  const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

export const formatDateNumber = (inputDateTime: string) => {
  const date = new Date(inputDateTime);
  const year = date.getUTCFullYear().toString().slice(-2); // Extract the last two digits
  const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Function to add leading zero if the value is less than 10
  const addLeadingZero = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  const formattedDate = `${day}/${month}/${year} ${addLeadingZero(hours % 12 || 12)}:${addLeadingZero(minutes)} ${hours >= 12 ? "PM" : "AM"}`;
  return formattedDate;
};

export const formatNumberSuffix = (number: number) => {
  if (number >= 1000) {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixIndex = Math.floor(("" + number).length / 3);
    const shortNumber = parseFloat(
      (suffixIndex !== 0 ? number / 1000 ** suffixIndex : number).toPrecision(
        3,
      ),
    );
    return shortNumber + suffixes[suffixIndex];
  }
  return number;
};

export const ordinalSuffixOf = (i: number) => {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};
export const calculateIndex = (
  pagination: { pageSize?: number; page?: number },
  index: number,
): number =>
  index + 1 + (pagination?.pageSize || 0) * ((pagination?.page || 0) - 1);

export const timeStringToSeconds = (timeString: string) => {
  const timeParts = timeString?.split(":").map(Number);
  if (timeParts?.length === 3) {
    const [hours, minutes, seconds] = timeParts;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }
  return 0;
};

export const normalDateToUnixInSecond = (date: string) => {
  return new Date(date).valueOf() / 1000;
};

// First Name and Last Name Format.
export const getFormattedName = (
  firstName?: string | undefined,
  lastName?: string | undefined,
  isMessage?: boolean,
) => {
  if (firstName || lastName) {
    const formattedFirstName = firstName ? toUpperFirst(firstName) : "";
    const formattedLastName = lastName ? toUpperFirst(lastName) : "";
    return `${formattedFirstName}${firstName && lastName ? " " : ""}${formattedLastName}`;
  } else {
    return isMessage ? "N/A" : "";
  }
};

// Capitalizes the first letter of a string and converts the rest of the string to lowercase.
export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Transform a string from snake_case to Center Right
export const transformToCenterRight = (inputString: string): string => {
  const words = inputString.toLowerCase().split("_");
  const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
  return capitalizedWords.join(" ");
};
export const truncateString = (str: string, maxLength: number) => {
  if (str?.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};

export function getMaxNumberFromString(inputString?: string) {
  const numbersArray = inputString?.split(/[,\s-]+/);
  const numericValues = numbersArray
    ?.map(Number)
    .filter((value) => !isNaN(value));
  if (numericValues === undefined || numericValues.length === 0) {
    return undefined;
  }
  const maxNumber = Math.max(...numericValues);
  return maxNumber;
}
export function getTrackingInfo(trackingNumber?: string, trackingUrl?: string) {
  if (trackingNumber === "") {
    return trackingUrl;
  } else if (trackingUrl === "") {
    return trackingNumber;
  } else {
    return undefined;
  }
}
export function formatLink(link: string) {
  if (!link) {
    return "";
  }

  if (link.toLowerCase().startsWith("www.")) {
    return `https://${link}`;
  }

  return link;
}

export const truncateText = (text: string, maxWords: number) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
