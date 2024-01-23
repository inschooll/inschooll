import React, { type InputHTMLAttributes, type DetailedHTMLProps } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiFillExclamationCircle } from "react-icons/ai";
import { MinMaxContainer } from "./label_textarea_field";
import Label from "./label";
import { useFormContext } from 'react-hook-form';

export type InputProps = {
  label?: string;
  description?: string;
  isValid?: boolean;
  isLoading?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({
  label,
  description,
  isValid,
  isLoading,
  ...props
}: InputProps) {
  // adds right padding when a ✅ icon or 🔃 icon is shown on the rhs of the input field
  let padRight = "";
  if (isValid != undefined && isLoading != undefined) padRight = "pr-8";
  // const { register, formState: {errors} } = useFormContext();
  const methods = useFormContext();

  return (
    <div className="relative">
      {/* label */}
      {!!label && (<InputLabel label={label} minLength={props.minLength} maxLength={props.maxLength} required={props.required} />)}

      {/* description */}
      {!!description && (<InputDescription description={description} />)}

      {/* input */}
      <div className="relative">
        <input
          alt={isValid === false ? "invalid" : undefined}
          className={`focus:border-1 h-10 w-full rounded border-2 border-cc-border-main bg-cc-input-bg px-2 text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 focus:border-cc-primary-main ${padRight}`}
          {...methods?.register(props.name!) }
          {...props}
        />
        
        {/* isLoading */}
        {isLoading && (
          <div role="status" className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <svg aria-hidden="true" className="w-3.5 h-3.5 animate-spin text-cc-content-main fill-cc-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {/* valid or invalid icon */}
        {isValid !== undefined && !isLoading && (
          <div aria-hidden="true" className="absolute right-0 top-1/2 w-5 -translate-x-1/4 -translate-y-1/2">
            {isValid ? (
              <IoIosCheckmarkCircle className="text-green-500" title="Perfect" />
            ) : (
              <AiFillExclamationCircle
                className="text-red-500"
                title="Already exists!"
              />
            )}
          </div>
        )}

      </div>
      {/* error message */}
      {!!props.name && !!methods?.formState.errors[props.name] && (
        <InputErrorMessage value={methods?.formState.errors[props.name]?.message as string} />
      )}
    </div>
  );
}


export const InputLabel = ({label, ...props}: {label: string} & Omit<InputProps, 'label'>) => {
  return (
    <div
      className={`pb-1 ${
        props.minLength ?? props.maxLength
          ? "flex items-center justify-between"
          : ""}`
      }
    >
      <Label
        value={label}
        isRequired={props.required ?? false}
      />
      {/* Min or Max length */}
      {(props.maxLength ?? props.minLength) && (
        <MinMaxContainer min={props.minLength} max={props.maxLength} />
      )}
    </div>
  );
}

export const InputDescription = (props: {description: string}) => {
  return (
    <div className="pb-2 text-cc-content/80 text-xs">
      <p>{props.description}</p>
    </div>
  );
}

export const InputErrorMessage = (props : {value: string}) => {
  return (
    <div className="mt-2 text-xs text-red-500">
      <p>{props.value}</p>
    </div>
  );
}