import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

export default function SelectInputField ({
  name,
  select,
  options,
  pressOnChange,
}: {
  name: string;
  select?: string;
  options: string[];
  pressOnChange: (value: string) => void;
}) {
  return (
    <Select.Root onValueChange={pressOnChange}>
      <Select.Trigger
        className={
          "focus:border-1 mt-1 flex h-10 w-full items-center justify-between rounded border-2 bg-cc-input-bg px-2 text-cc-input-text outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-cc-content-main/20 focus:border-cc-primary-main"
        }
        aria-label={name}
      >
        <Select.Value placeholder={select ?? name} className="" />
        <Select.Icon className="">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="rounded border border-cc-border-main bg-cc-background-main px-2 py-2">
          {/* scroll up */}
          <Select.ScrollUpButton className="flex justify-center py-1 cursor-pointer">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          {/* content */}
          <Select.Viewport className="SelectViewport">
            {options.map((option, index) => (
              <Select.Item className={"flex justify-between items-center px-3 py-2 outline-none hover:bg-cc-border-main rounded cursor-pointer"} value={option} key={index}>
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          {/* scroll down */}
          <Select.ScrollDownButton className="flex justify-center py-2 cursor-pointer">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};