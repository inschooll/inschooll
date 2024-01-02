import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Button2Props = {
  variant?: "blue" | "green" | "red" | "gray";
  children: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  px?: number | string;
  py?: number | string;
  width?: "full";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export default function Button2({
  children,
  variant = "blue",
  rounded = "md",
  px = 3,
  py = 1,
  width,
  ...props
}: Button2Props) {
  const colorStyles = getColor(variant);
  const paddingStyles = `px-${px} py-${py}`;

  return (
    <button
      className={`border ${colorStyles} ${width ? `w-${width}` : paddingStyles} rounded-${rounded} transition duration-200`}
      {...props}
    >
      {children}
    </button>
  );
}

function getColor(variant: "blue" | "green" | "red" | "gray") {
  switch (variant) {
    case "blue":
      return "bg-cc-primary-main/50 border-cc-primary-main/70 hover:bg-cc-primary-main/60 hover:border-cc-primary-main active:bg-cc-primary-main/80";
    case "green":
      return "bg-cc-green-main/50 border-cc-green-main/70 hover:bg-cc-green-main/60 hover:border-cc-green-main active:bg-cc-green-main/80";
    case "red":
      return "bg-cc-red-main/50 border-cc-red-main/70 hover:bg-cc-red-main/60 hover:border-cc-red-main active:bg-cc-red-main/80";
    case "gray":
      return "bg-gray-400/50 border-gray-400/70 hover:bg-gray-400/60 hover:border-gray-400 active:bg-gray-400/80";
    default:
      return "";
  }
}