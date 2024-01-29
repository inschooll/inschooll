import React, { type TextareaHTMLAttributes, type DetailedHTMLProps } from "react";
import { InputDescription, InputErrorMessage, InputLabel } from "./input";
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
      {props.label && (<InputLabel label={props.label} minLength={props.minLength} maxLength={props.maxLength} required={props.required} />)}

      {/* description */}
      {!!props.description && (<InputDescription description={props.description} />)}

      <textarea
        rows={props.rows ?? 8}
        className={
          "focus:border-1 resize-none w-full rounded border-2 bg-cc-input-bg px-2 text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 border-cc-border-main focus:border-cc-primary-main"
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
