import { cn } from "~/lib/utils";

type TProps = {
  children: React.ReactNode, 
  className?: string,
  // TODO: Remove color and weight since they are now deprecated
  color?: string, 
  weight?: "regular" | "medium" | "semibold" | "bold",
}

export function T1({children, className} : TProps) {
  return (
    <h1 className={cn("font-semibold text-4xl md:text-5xl text-cc-content-sub", className)}>{children}</h1>
  );
}
export function T2({children, className} : TProps) {
  return (
    <h2 className={cn("font-semibold text-3xl md:text-4xl text-cc-content-sub", className)}>{children}</h2>
  );
}
export function T3({children, className} : TProps) {
  return (
    <h3 className={cn("font-semibold text-2xl md:text-3xl text-cc-content-sub", className)}>{children}</h3>
  );
}
export function T4({children, className} : TProps) {
  return (
    <h4 className={cn("font-semibold text-xl md:text-[26px] text-cc-content-sub", className)}>{children}</h4>
  );
}
export function T5({children, className} : TProps) {
  return (
    <h5 className={cn("font-semibold text-lg md:text-xl text-cc-content-sub", className)}>{children}</h5>
  );
}
export function T6({children, className} : TProps) {
  return (
    <h6 className={cn("font-semibold text-base md:text-lg text-cc-content-sub", className)}>{children}</h6>
  );
}