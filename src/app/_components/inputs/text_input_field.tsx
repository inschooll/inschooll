import React, { type InputHTMLAttributes, type DetailedHTMLProps } from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
>;

const TextInputField = ({
  ...props
}: InputProps) => {
  return (
    <input
      className={"h-10 w-full rounded border-2 px-2 text-cc-input-text bg-cc-input-bg outline-none placeholder:font-normal placeholder:text-cc-content-main/20 focus:border-1 focus:border-cc-primary-main transition-colors duration-200"}
      {...props}
    />
  );
};

export default TextInputField;
