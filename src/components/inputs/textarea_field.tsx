'use client';
import React, { type TextareaHTMLAttributes, type DetailedHTMLProps } from "react";
import { InputDescription, InputErrorMessage, LabelAndDescription } from "./input";
import { useFormContext } from "react-hook-form";

export type TextareaProps = {
  label?: string,
  description?: string,
  errorMessage?: string,
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export default function TextareaField({...props}: TextareaProps) {
  const methods = useFormContext();

  return (
    <div>
      {/* label */}
      {props.label && (<LabelAndDescription label={props.label} description={props.description} minLength={props.minLength} maxLength={props.maxLength} required={props.required} />)}

      <textarea
        rows={props.rows ?? 8}
        className={
          "focus:border-1 resize-none w-full rounded border focus:ring-2 ring-cc-primary/50 bg-cc-input-bg px-2 py-1.5 text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 border-cc-border-main focus:border-cc-primary-main"
        }
        {...methods?.register(props.name!) }
        {...props}
      />

      {/* error message */}
      {props.errorMessage && (
        <InputErrorMessage value={props.errorMessage} />
      )}
    </div>
  );
}
