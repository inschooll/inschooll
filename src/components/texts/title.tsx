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
    <h4 className={cn("font-semibold text-5xl text-cc-content-sub", className)}>{children}</h4>
  );
}
export function T2({children, className} : TProps) {
  return (
    <h4 className={cn("font-semibold text-4xl text-cc-content-sub", className)}>{children}</h4>
  );
}
export function T3({children, className} : TProps) {
  return (
    <h4 className={cn("font-semibold text-3xl text-cc-content-sub", className)}>{children}</h4>
  );
}
export function T4({children, className} : TProps) {
  return (
    <h4 className={cn("font-semibold text-[26px] text-cc-content-sub", className)}>{children}</h4>
  );
}
export function T5({children, className} : TProps) {
  return (
    <h4 className={cn("font-semibold text-xl text-cc-content-sub", className)}>{children}</h4>
  );
}
export function T6({children, className} : TProps) {
  return (
    <h4 className={cn("font-semibold text-lg text-cc-content-sub", className)}>{children}</h4>
  );
}