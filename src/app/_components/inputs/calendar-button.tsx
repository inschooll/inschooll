import { useState } from "react";
import { ClickOutsideClose } from "./dropdown-button";
import { FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


export default function CalendarDropdownButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState<string>();

  return (
    <>
      {showDropdown && (<ClickOutsideClose setShowDropdown={setShowDropdown} />)}
      <div className="relative">
        {showDropdown && (
          <div className="absolute top-11 w-full rounded border border-cc-border-main bg-cc-background-main px-2 py-3 shadow-lg z-50">
            <DropdownCalendar updateDate={setValue} />
          </div>
        )}

        {/* button */}
        <div
          className="dropdown-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <p className="text-cc-content-sub truncate">{value ?? 'Date'}</p>
          <FaRegCalendarAlt className="text-cc-content-sub" />
        </div>
      </div>
    </>
  );
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function DropdownCalendar({updateDate} : {updateDate: (v: string) => void}) {
  const [value, onChange] = useState<Value>(new Date());

  function update(value: Value) {
    onChange(value);
    const date = value!.toLocaleString().split(',')[0]!; // result would be => 12/15/2023
    updateDate(date);
    // alert('${value}' + '\n' + value?.toLocaleString() + '\n' + value?.toString());
  }
  
  return (
    <Calendar onChange={update} defaultValue={value} />
  );
}