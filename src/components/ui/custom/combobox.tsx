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

export type ComboboxFrameworksProps = { value: string; label: string }[];

export type ComboboxProps = {
  defaultValue?: string;
  searchPlaceholder?: string;
  frameworks: ComboboxFrameworksProps;
  searchNotFoundMsg?: string;
};
export function Combobox({
  defaultValue = "Select ...",
  frameworks,
  searchPlaceholder = "Search ...",
  searchNotFoundMsg = 'None found.',
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ComboboxFrameworksProps[0] | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected
            ? frameworks.find((framework) => framework.value === selected.value)?.label
            : defaultValue}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandEmpty>{searchNotFoundMsg}</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.label}
                onSelect={(currentLabel) => {
                  // currentLabel is already by default converted to lowercase
                  setSelected(currentLabel === selected?.label.toLocaleLowerCase() ? null : framework);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selected?.value === framework.value ? "opacity-100" : "opacity-0",
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
