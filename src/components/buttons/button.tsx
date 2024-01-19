'use client';

import Lottie from "lottie-react";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import spinner from '../../../public/lottie/spinner.json';
import { cn } from "~/lib/utils";

type sizeType = "xs" | "sm" | "md" | "lg";
type variantType =
  | "default"
  | "noBackground"
  | "outline"
  | "defaultFull"
  | "noBackgroundFull"
  | "outlineFull";

type ButtonProps = {
  size?: sizeType;
  className?: string;
  variant?: variantType;
  isLoading?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  size,
  variant,
  className = "",
  isLoading = false,
  ...props
}: ButtonProps) {
  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);
  const colorClasses = !isLoading ? "bg-cc-primary-main active:bg-cc-primary-main" : "bg-cc-primary-sub active:bg-cc-primary-sub";

  return (
    <button
      className={cn("flex justify-center items-center whitespace-nowrap rounded-[4px] text-sm font-semibold shadow transition-all duration-[500] disabled:cursor-not-allowed", colorClasses, sizeClasses, variantClasses, className)}
      {...props}
      disabled={isLoading}
    >
      {!isLoading 
      ? props.children 
      : <Lottie
          animationData={spinner}
          className=" w-16 h-16"
          loop={true}
        />
      }
    </button>
  );
}

function getSizeClasses(size?: sizeType) {
  const sizes = {
    xs: "h-8 px-7",
    sm: "h-9 px-7",
    md: "h-10 px-7",
    lg: "h-11 px-7",
  };

  switch (size) {
    case "xs":
      return sizes.xs;
    case "sm":
      return sizes.sm;
    case "md":
      return sizes.md;
    case "lg":
      return sizes.lg;
    default:
      return sizes.sm;
  }
}

function getVariantClasses(variant?: variantType) {

  const variants = {
    default: "text-white md:hover:bg-cc-primary-sub",
    noBackground:
      "bg-transparent text-cc-content-main active:bg-transparent hover:bg-cc-input-bg shadow-none",
    outline:
      "bg-transparent text-cc-content-main border-2 border-cc-border-main active:bg-transparent hover:bg-cc-input-bg shadow-none",
    defaultFull: "text-white w-full md:hover:bg-cc-primary-sub",
    noBackgroundFull:
      "bg-transparent text-cc-content-main w-full md:hover:bg-bg-cc-content-sub/10 active:bg-cc-primary-main hover:bg-cc-input-bg shadow-none",
    outlineFull:
      "bg-transparent text-cc-content-main border-2 w-full border-cc-border-main active:bg-transparent hover:bg-cc-input-bg shadow-none",
  };

  switch (variant) {
    case "default":
      return variants.default;
    case "noBackground":
      return variants.noBackground;
    case "outline":
      return variants.outline;

    case "defaultFull":
      return variants.defaultFull;
    case "noBackgroundFull":
      return variants.noBackgroundFull;
    case "outlineFull":
      return variants.outlineFull;

    default:
      return variants.default;
  }
}
