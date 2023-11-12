import Label from "./label";
import TextareaField, { type TextareaProps } from "./textarea_field";

export default function LabelTextareaField({label, explanation, ...props} : {label: string, explanation?: string | React.ReactNode} & TextareaProps) {
  const id = label.split(' ').join('_').toLowerCase();
  
  return (
    <div>
      <div className={(props.minLength ?? props.maxLength) ? "flex items-center justify-between pb-[2px]" : ""}>
        <Label value={label} isRequired={props.required ?? false} labelFor={id} />
        {(props.maxLength ?? props.minLength) && (
          <MinMaxContainer min={props.minLength} max={props.maxLength} />
        )}
      </div>
      <div className="mt-1">
        <TextareaField {...props} id={id} />
      </div>
      {explanation && <div className="mt-2 text-xs text-cc-content-main/50">
        <p>{explanation}</p>
      </div>}
    </div>
  );
};

export function MinMaxContainer({min, max} : {min?: number, max?: number}) {
  return (
    <div>
      <div className="flex">
        {min && (
          <p className="text-xs text-cc-content-main/20">Min length: {min}{max && (<div className="inline-block mx-1 relative -top-[2px]"> | </div>)}</p>
        )}
        {max && (
          <p className="text-xs text-cc-content-main/20">Max length: {max}</p>
        )}
      </div>
    </div>
  );
}