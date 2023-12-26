import CalendarDropdownButton from "./calendar-button";
import DropdownButton, { type DropdownButtonProps } from "./dropdown-button";
import Label from "./label";

export default function LabelDropdown({label, ...props} : {label: string} & DropdownButtonProps ) {
  const id = label.split(' ').join('_').toLowerCase();
  
  return (
    <div className="pt-2">
      <div className={"flex items-center justify-between pb-[2px]"}>
        <Label isRequired={false} value={label} labelFor={id} />
      </div>
      <div className="mt-1">
        <DropdownButton {...props} />
      </div>
    </div>
  );
};

export function LabelCalendarDropdownButton({label} : {label: string} ) {
  const id = label.split(' ').join('_').toLowerCase();
  
  return (
    <div className="pt-2">
      <div className={"flex items-center justify-between pb-[2px]"}>
        <Label isRequired={false} value={label} labelFor={id} />
      </div>
      <div className="mt-1">
        <CalendarDropdownButton />
      </div>
    </div>
  );
};