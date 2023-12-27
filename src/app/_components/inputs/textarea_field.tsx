import React, { type TextareaHTMLAttributes, type DetailedHTMLProps } from "react";

export type TextareaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export default function TextareaField({...props}: TextareaProps) {
  return (
    <textarea
      rows={props.rows ?? 8}
      className={
        "focus:border-1 py-2 resize-none w-full rounded border-2 bg-cc-input-bg px-2 text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 border-cc-border-main focus:border-cc-primary-main"
      }
      {...props}
    />
  );
}
