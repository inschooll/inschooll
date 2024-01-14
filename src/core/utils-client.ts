/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import assert from "assert";
import { usePopUpStore } from "~/app/_components/popups/popup_store";
import type { monthsType } from "~/app/core/constants/constants";
import errorMessages from "~/app/core/constants/error-messages";
import successMessages from "~/app/core/constants/success-messages";

export async function uploadImage({ file, getPresignedURL }: UploadImageProp) {
  const {
    url,
    fields,
    imageKey: imageId,
  } = await getPresignedURL({ fileType: file.type });

  const formData = new FormData();
  const data = {
    ...fields,
    "Content-Type": file.type,
    file,
  };
  for (const key in data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = data[key];
    formData.append(key, value as string | Blob);
  }

  // send fetch request to add image to s3 bucket
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  console.log(res);

  return imageId;
}

// types
interface UploadImageProp {
  file: File;
  getPresignedURL: ({ fileType }: { fileType: string }) => Promise<{
    url: string;
    fields: Record<string, unknown>;
    imageKey: string;
  }>;
}

export function getDaysInMonth(year: number, month: number) {
  // Use 0 for January, 1 for February, ..., 11 for December
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

export function isFebruaryAndLeapYear(year: number, month: monthsType) {
  const isLeapYear = year % 4 === 0;
  return isLeapYear && month === "February" ? true : false;
}

export const toTitleCase = (value: string) => {
  assert(value.length > 0);
  let result = "";
  value.split(" ").map((word, index) => {
    if (index > 0) result += " ";

    if (["of", "the", "in"].includes(word)) return (result += word);

    result += word[0]?.toUpperCase() + word.slice(1).toLowerCase();
  });

  return result;
};

export function useHandleError() {
  const { addPopup } = usePopUpStore();

  const handleError = ({ msg }: { msg: string }) => {
    const message = getErrorMessage(msg);
    addPopup({ text: message, type: "error" });
  };

  return { handleError };
}

export function useHandleSuccess() {
  const { addPopup } = usePopUpStore();

  const handleSuccess = ({ msg }: { msg: string }) => {
    const successMsgs = Object.values(successMessages);
    for (const successMsg of successMsgs) {
      if (msg.includes(successMsg)) {
        return addPopup({ text: msg, type: "success" });
      }
    }

    addPopup({ text: "Successful", type: "success" });
  };

  return { handleSuccess };
}

export function getErrorMessage(msg: string) {
  // check internet connection error
  if (msg.includes("fetch failed")) {
    return "Poor Internet Connection";
  }

  // check error messages if the error gotten matches any
  const errMsgs = Object.values(errorMessages);
  for (const errorMsg of errMsgs) {
    if (msg.includes(errorMsg)) {
      return msg;
    }
  }

  // if no error was matched return 'Something went wrong' 
  return 'Something went wrong';
}

export function isPhoneNumber(phoneNumber: string) {
  return phoneNumber.length < 7 || phoneNumber.length > 20;
}