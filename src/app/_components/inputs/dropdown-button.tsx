"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

type optionsType = { icon?: React.ReactNode; title: string }[];

export interface DropdownButtonProps {
  options: optionsType;
  defaultSelectedOptionIndex?: number;
  updateSelected?: (index: number) => void;
}

export default function DropdownButton({
  options,
  defaultSelectedOptionIndex=0,
  updateSelected,
}: DropdownButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultSelectedOptionIndex);

  const updateSelection = (index: number) => {
    setSelectedOptionIndex(index);
    if (updateSelected) updateSelected(index);
    setShowDropdown(false);
  }

  return (
    <>
      {showDropdown && (<ClickOutsideClose setShowDropdown={setShowDropdown} />)}
      <div className="relative">
        {showDropdown && (<DropdownList options={options} selectedOptionIndex={selectedOptionIndex} updateSelection={updateSelection} />)}

        {/* button */}
        <div
          className="dropdown-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center gap-3 pr-2 truncate">
            {options[selectedOptionIndex]?.icon ? options[selectedOptionIndex]!.icon : <></>}
            <p className="text-cc-content-sub truncate">{options[selectedOptionIndex]?.title}</p>
          </div>

          <FaCaretDown className="text-cc-content-sub" />
        </div>
      </div>
    </>
  );
}

function DropdownList({options, selectedOptionIndex, updateSelection}: {options: optionsType, selectedOptionIndex: number, updateSelection: (index: number) => void}) {  

  const DropdownItem = ({data, index}: {data: optionsType[0], index: number}) => (
    <li className="flex items-center gap-2 px-2 py-2 app-hover rounded cursor-pointer" onClick={() => updateSelection(index)}>
      <span className="w-4 pt-[2px]">
        {selectedOptionIndex === index && <FaCheck size={12} className="text-cc-content-main/80" />}
      </span>
      {data.icon}
      <p className="text-[15px]">{data.title}</p>
    </li>
  )

  return (
    <ul className="absolute top-11 w-full rounded border border-cc-border-main bg-cc-background-main px-2 py-3 shadow-lg z-50">
      {options.map((data, index) => (
        <DropdownItem data={data} index={index} key={index} />
      ))}
    </ul>
  );
}

export function ClickOutsideClose({setShowDropdown} : {setShowDropdown: (v: boolean) => void}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full" onClick={() => setShowDropdown(false)}></div>
  );
}