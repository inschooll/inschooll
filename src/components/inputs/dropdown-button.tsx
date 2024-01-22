"use client";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

type IconAndTitleProp = { icon?: React.ReactNode; title: string };

type optionsType = IconAndTitleProp[] | string[];

export interface DropdownButtonProps {
  name?: string;
  options: optionsType;
  defaultSelectedOptionIndex?: number;
  updateSelected: (index: number) => void;
}

export default function DropdownButton({
  name,
  options,
  defaultSelectedOptionIndex = 0,
  updateSelected,
}: DropdownButtonProps) {
  const [defaultName, setDefaultName] = useState(name);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(
    defaultSelectedOptionIndex,
  );

  // set the actual type of the options
  if (typeof options[0] === "string") {
    options = options as string[];
  } else {
    options = options as IconAndTitleProp[];
  }

  const List = () => {
    if (typeof options[0] === "string") {
      options = options as string[];
      return options.map((item, index) => (
        <DropdownMenuRadioItem value={String(index)} key={index}>
          <p className="truncate text-[15px]">{item}</p>
        </DropdownMenuRadioItem>
      ));
    } else {
      options = options as IconAndTitleProp[];
      return options.map((item, index) => (
        <DropdownMenuRadioItem
          value={String(index)}
          key={index}
          className="flex cursor-pointer items-center gap-2 rounded px-2 py-2"
        >
          {item.icon}
          <p className="truncate text-[15px]">{item.title}</p>
        </DropdownMenuRadioItem>
      ));
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <CustomDropdownButton title={defaultName} options={options} selectedOptionIndex={selectedOptionIndex} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full border border-cc-border">
          <DropdownMenuRadioGroup
            value={String(selectedOptionIndex)}
            onValueChange={(indexAsString) => {
              setDefaultName(undefined)
              const newIndex = parseInt(indexAsString);
              setSelectedOptionIndex(newIndex);
              updateSelected(newIndex);
            }}
          >
            {/* TODO: add ScrollArea shadcn component */}
            <ScrollArea className={!!options.length ? "h-[50vh] w-full" : "min-h-4"}>
              <List />
            </ScrollArea>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const CustomDropdownButton = ({
  title,
  options,
  selectedOptionIndex,
}: {
  title?: string,
  options: optionsType,
  selectedOptionIndex: number,
}) => {
  return (
    <div className="dropdown-button">
      {typeof options[0] === "string" ? (
        <div className="truncate pr-2">
          <DropdownDisplayContent
            defaultName={title}
            title={options[selectedOptionIndex] as string}
          />
        </div>
      ) : (
        <DropdownDisplayContent
          defaultName={title}
          icon={(options[selectedOptionIndex] as IconAndTitleProp)?.icon}
          title={(options[selectedOptionIndex] as IconAndTitleProp)?.title}
        />
      )}

      <FaCaretDown className="text-cc-content-sub" />
    </div>
  );
};

function DropdownDisplayContent({
  defaultName,
  icon,
  title,
}: IconAndTitleProp & { defaultName?: string }) {
  return (
    <div className="flex items-center gap-3 truncate pr-2">
      {icon}
      {defaultName && <p className="">{defaultName}</p>}
      {!defaultName && <p className="truncate text-cc-content-sub">{title}</p>}
    </div>
  );
}

export function ClickOutsideClose({
  setShowDropdown,
}: {
  setShowDropdown: (v: boolean) => void;
}) {
  return (
    <div
      className="absolute left-0 top-0 h-full w-full"
      onClick={() => setShowDropdown(false)}
    ></div>
  );
}
