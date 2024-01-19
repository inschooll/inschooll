"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

type IconAndTitleProp = { icon?: React.ReactNode; title: string }

type optionsType = IconAndTitleProp[] | string[];

export interface DropdownButtonProps {
  name?: string;
  options: optionsType;
  defaultSelectedOptionIndex?: number;
  updateSelected?: (index: number) => void;
}

export default function DropdownButton({
  name,
  options,
  defaultSelectedOptionIndex=0,
  updateSelected,
}: DropdownButtonProps) {
  const [defaultName, setDefaultName] = useState(name);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultSelectedOptionIndex);

  const updateSelection = (index: number) => {
    // remove dropdown name from display
    setDefaultName(undefined);

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
          {typeof options[0] === "string" ? (
            <div className="pr-2 truncate">
              
              <DropdownDisplayContent 
                defaultName={defaultName}
                title={options[selectedOptionIndex] as string} 
              />
            </div>
          ) : (
            <DropdownDisplayContent 
              defaultName={defaultName}
              icon={(options[selectedOptionIndex] as IconAndTitleProp)?.icon} 
              title={(options[selectedOptionIndex] as IconAndTitleProp)?.title} 
            />
          )}

          <FaCaretDown className="text-cc-content-sub" />
        </div>
      </div>
    </>
  );
}

function DropdownDisplayContent({defaultName, icon, title} : IconAndTitleProp & {defaultName?: string}) {
  return (
    <div className="flex items-center gap-3 pr-2 truncate">
      {icon}
      {defaultName && <p className="">{defaultName}</p>}
      {!defaultName && <p className="text-cc-content-sub truncate">{title}</p>}
    </div>
  );
}

function DropdownList({options, selectedOptionIndex, updateSelection}: {options: optionsType, selectedOptionIndex: number, updateSelection: (index: number) => void}) {  
  return (
    <ul className="absolute top-11 max-h-[40vh] overflow-scroll w-full rounded border border-cc-border-main bg-cc-background-main px-2 shadow-lg z-50">
      {options.map((data, index) => (
        typeof options[0] === "string" ? (
          <DropdownItem 
            title={data as string} 
            index={index} 
            key={index} 
            isSelected={selectedOptionIndex === index} 
            updateSelection={updateSelection} 
          />
        ) : (
          <DropdownItem 
            icon={(data as IconAndTitleProp).icon} 
            title={(data as IconAndTitleProp).title} 
            index={index} 
            key={index}
            isSelected={selectedOptionIndex === index} 
            updateSelection={updateSelection} 
          />
        )
      ))}
    </ul>
  );
}

const DropdownItem = ({icon, title, isSelected=false, updateSelection, index}: IconAndTitleProp & {isSelected: boolean, updateSelection: (index: number) => void, index: number}) => (
  <li className="flex items-center gap-2 px-2 py-2 app-hover rounded cursor-pointer" onClick={() => updateSelection(index)}>
    <span className="w-4 pt-[2px] shrink-0">
      {isSelected && <FaCheck size={12} className="text-cc-content-main/80" />}
    </span>
    {icon}
    <p className="text-[15px] truncate">{title}</p>
  </li>
)

export function ClickOutsideClose({setShowDropdown} : {setShowDropdown: (v: boolean) => void}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full" onClick={() => setShowDropdown(false)}></div>
  );
}