import { cn } from "~/lib/utils";

export default function Label({className, value, labelFor, isRequired} : {className?: string, value: string, labelFor?: string, isRequired?: boolean}) {
  return (
    <label htmlFor={labelFor} className={cn("text-sm font-medium text-cc-content/80", className)}>
      {value[0]?.toLocaleUpperCase() + value.slice(1,).toLowerCase()}
      {isRequired && <span className="text-red-500"> *</span>}
    </label>
  );
}