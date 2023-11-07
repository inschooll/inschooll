import TextInputField, { type InputProps } from "./text_input_field";

const LabelAndTextInputField = ({label, ...props} : {label: string} & InputProps) => {
  
  return (
    <>
      <Label value={label} isRequired={props.required ?? false} />
      <div className="mt-1">
        <TextInputField {...props} />
      </div>
    </>
  );
};

export default LabelAndTextInputField;

export function Label({className, value, isRequired} : {className?: string, value: string, isRequired: boolean}) {
  return (
    <p className={`text-xs text-cc-content-main/80m ${className}`}>
      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
      {isRequired && <span className="text-red-500"> *</span>}

    </p>
  );
}