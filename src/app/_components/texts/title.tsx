interface TProps {
  children: React.ReactNode, 
  color?: string,
  weight?: "regular" | "medium" | "semibold" | "bold"
}

export function T1({children, weight="bold", color="text-cc-content-sub"} : TProps) {
  return (
    <h4 className={`font-${weight} text-5xl ${color}`}>{children}</h4>
  );
}
export function T2({children, weight="bold", color="text-cc-content-sub"} : TProps) {
  return (
    <h4 className={`font-${weight} text-4xl ${color}`}>{children}</h4>
  );
}
export function T3({children, weight="bold", color="text-cc-content-sub"} : TProps) {
  return (
    <h4 className={`font-${weight} text-3xl ${color}`}>{children}</h4>
  );
}
export function T4({children, weight="bold", color="text-cc-content-sub"} : TProps) {
  return (
    <h4 className={`font-${weight} text-xl ${color}`}>{children}</h4>
  );
}
export function T5({children, weight="bold", color="text-cc-content-sub"} : TProps) {
  return (
    <h4 className={`font-${weight} text-lg ${color}`}>{children}</h4>
  );
}
export function T6({children, weight="bold", color="text-cc-content-sub"} : TProps) {
  return (
    <h4 className={`font-${weight} text-base ${color}`}>{children}</h4>
  );
}