"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
export type SelectComboFrameworksProps = {
  avatar?: string;
  value: string;
  label: string;
}[];

export type SelectComboProps = {
  defaultValue?: string;
  frameworks: SelectComboFrameworksProps;
  buttonClassName?: string;
  onChange?: (value: string) => void;
};

export default function SelectCombo({
  defaultValue = "Select ...",
  frameworks,
  buttonClassName,
  onChange,
}: SelectComboProps) {
  const [selected, setSelected] = useState<
    SelectComboFrameworksProps[0] | null
  >(null);

  return (
    <Select
      onValueChange={(value) => {
        if (value === selected?.value) return setSelected(null);

        const newSelected = frameworks.find(
          (framework) => framework.value === value,
        );
        setSelected(newSelected ?? null);
        onChange && onChange(value);
      }}
    >
      <SelectTrigger className={cn("w-[180px]", buttonClassName)}>
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {frameworks.map((framework) => (
            <SelectItem value={framework.label} key={framework.value}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
