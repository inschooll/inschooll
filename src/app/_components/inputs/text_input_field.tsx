import React, { type InputHTMLAttributes, type DetailedHTMLProps } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiFillExclamationCircle } from "react-icons/ai";
import Lottie from "lottie-react";
import lottie from '~/app/core/constants/lottie';

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function TextInputField({
  isValid,
  isLoading,
  ...props
}: { isValid?: boolean, isLoading?: boolean } & InputProps) {
  // adds right padding when a ✅ icon or 🔃 icon is shown on the rhs of the input field
  let padRight = '';
  if (isValid != undefined && isLoading != undefined) padRight = 'pr-8'
  
  return (
    <div className="relative">
      <input
        alt={isValid === false ? 'invalid' : undefined}
        className={
          `focus:border-1 h-10 w-full rounded border-2 bg-cc-input-bg px-2 text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 border-cc-border-main focus:border-cc-primary-main ${padRight}`
        }
        {...props}
      />

      {/* valid or invalid */}
      {isValid !== undefined && !isLoading && (
        <div className="absolute right-0 top-1/2 w-5 -translate-x-1/4 -translate-y-1/2">
          {isValid ? (
            <IoIosCheckmarkCircle className="text-green-500" title="Perfect"/>
          ) : (
            <AiFillExclamationCircle className="text-red-500" title="Already exists!"/>
          )}
        </div>
      )}

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

// const TextInputField = React.forwardRef((props) => (
//   <input
//     className={"h-10 w-full rounded border-2 px-2 text-cc-input-text bg-cc-input-bg outline-none placeholder:font-normal placeholder:text-cc-content-main/20 focus:border-1 focus:border-cc-primary-main transition-colors duration-200"}
//     {...props}
//   />
// ));

// export default TextInputField;
