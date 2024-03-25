"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export type ComboboxFrameworks = { value: string; label: string };

export type ComboboxProps = {
  defaultValue?: string;
  searchPlaceholder?: string;
  frameworks: ComboboxFrameworks[];
  defaultSelectedFramework?: ComboboxFrameworks,
  searchNotFoundMsg?: string;
  className?: string;
  disableSearch?: boolean;
  onChange?: (i: number) => void;
};
export function Combobox({
  defaultValue = "Select ...",
  defaultSelectedFramework,
  frameworks,
  searchPlaceholder = "Search ...",
  searchNotFoundMsg = "None found.",
  className,
  onChange,
  disableSearch = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<ComboboxFrameworks|undefined>(defaultSelectedFramework);

  const selectFramework = (i: number) => {
    const framework = frameworks[i];

    // if selection is the same - cancel selection
    if (framework?.label === selectedFramework?.label.toLocaleLowerCase()) {
      setSelectedFramework(undefined);
      setOpen(false);
      return;
    }

    // select new framework
    setSelectedFramework(framework);
    onChange && onChange(i);
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] font-normal justify-between truncate", className, {'text-cc-content/70': !selectedFramework})}
        >
          {selectedFramework
            ? selectedFramework.value
            : defaultValue}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {!disableSearch && (<CommandInput placeholder={searchPlaceholder} className="h-9" />)}
          <CommandEmpty>{searchNotFoundMsg}</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {frameworks.map((framework, i) => (
              <CommandItem
                key={framework.value}
                value={framework.label}
                onSelect={() => selectFramework(i)}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedFramework?.value === framework.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
