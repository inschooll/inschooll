'use client';
import Lottie from "lottie-react";
import type { InputProps } from "./text_input_field";
import lottie from "~/app/core/constants/lottie";
import { type ChangeEvent, useState } from "react";
import { MdCancel } from "react-icons/md";

export default function IconTextInputField({
  iconLeft,
  iconRight,
  isLoading,
  onChange,
  ...props
}: { iconLeft?: React.ReactNode, onChange: (v: string) => void, iconRight?: React.ReactNode, isValid?: boolean, isLoading?: boolean } & InputProps) {
  let iconStyles = '';
  iconStyles += (!!iconLeft ? ' pl-7' : 'pl-3');
  iconStyles += (!!iconRight ? ' pr-7' : 'pr-2');
  const [value, setValue] = useState<string>();

  const updateInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }
  const clearInputField = () => {
    setValue('');
    onChange('');
  }
  
  return (
    <div className="relative">
      <input
        value={value}
        onChange={updateInputValue}
        {...props}
        className={
          `focus:border-1 h-9 w-full rounded-lg border-2 bg-cc-input-bg text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 border-cc-content-main/10 focus:border-cc-primary-main ${iconStyles}` 
        }
      />

      {/* left icon */}
      {!!iconLeft && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2">{iconLeft}</div>
        )}

      {/* right icon */}
      {!!iconRight && !value?.length ? (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">{iconRight}</div>
      ) : <></>}

      {/* cancel icon */}
      {value?.length ? (
        <div onClick={clearInputField} className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">{<MdCancel className="text-cc-content-main/50 hover:text-cc-content-main/70 cursor-pointer transition duration-200" />}</div>
      ) : <></>}
      

      {/* isLoading */}
      {isLoading && (
        <div className="absolute right-0 top-1/2 translate-x-1/4 -translate-y-1/2">
          <Lottie
            animationData={lottie.spinner}
            className=" w-16 h-16"
            loop={true}
          />
        </div>
      )}
    </div>
  );
}