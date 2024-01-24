import Label from "./label";
import { MinMaxContainer } from "./label_textarea_field";
import Input, { type InputProps } from "./input";



export default function LabelAndTextInputField({label, explanation, errorMessage, inputIsValid, ...props} : {label: string, explanation?: string, errorMessage?: string, inputIsValid?: boolean} & InputProps) {
  const id = label.split(' ').join('_').toLowerCase();
  return (
    <div>
      <div className={(props.minLength ?? props.maxLength) ? "flex items-center justify-between pb-[2px]" : ""}>
        <Label value={label} isRequired={props.required ?? false} labelFor={id} />
        {/* Min or Max length */}
        {(props.maxLength ?? props.minLength) && (
          <MinMaxContainer min={props.minLength} max={props.maxLength} />
        )}
      </div>
      <div className="mt-1">
        <Input {...props} isValid={inputIsValid} isLoading={props.isLoading} id={id} />
      </div>
      {explanation && <div className="mt-2 text-xs text-cc-content-main/50">
        <p>{explanation}</p>
      </div>}
      {errorMessage && <div className="mt-2 text-xs text-red-500">
        <p>{errorMessage}</p>
      </div>}
    </div>
  );
};

