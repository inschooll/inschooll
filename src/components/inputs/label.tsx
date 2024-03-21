export default function Label({className, value, labelFor, isRequired} : {className?: string, value: string, labelFor?: string, isRequired: boolean}) {
  return (
    <label htmlFor={labelFor} className={`text-sm font-medium text-cc-content/80 ${className}`}>
      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
      {isRequired && <span className="text-red-500"> *</span>}
    </label>
  );
}