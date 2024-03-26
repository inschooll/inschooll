"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDesktop } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import type { Ttheme } from "~/lib/types";
import { cn, getTheme, setTheme } from "~/lib/utils";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


const frameworks = [
  {
    value: "system",
    icon: (
      <FaDesktop className="text-cc-content-sub hover:text-cc-content-main" />
    ),
  },
  {
    value: "light",
    icon: (
      <MdOutlineLightMode className="text-cc-content-sub hover:text-cc-content-main" />
    ),
  },
  {
    value: "dark",
    icon: (
      <MdOutlineDarkMode className="text-cc-content-sub hover:text-cc-content-main" />
    ),
  },
];

export default function ChangeThemeButtons() {
  const [open, setOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);

  useEffect(() => {
    // set default selected theme framework (icon & text)
    const theme = getTheme();
    setSelectedFramework(() => {
      if (theme === frameworks[0]?.value) return frameworks[0];
      if (theme === frameworks[1]?.value) return frameworks[1];
      return frameworks[2];
    })
  }, [])

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="app-hover flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
            {
              selectedFramework?.icon
            }
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0">
          <Command>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className={cn("flex items-center justify-between")}
                  onSelect={(currentValue) => {
                    setSelectedFramework(framework);
                    setTheme(currentValue as Ttheme);
                    setOpen(false);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <div className="mt-0.5">
                    {framework.icon}
                    </div>
                  {framework.value.charAt(0).toUpperCase() +
                    framework.value.slice(1)}

                  </div>
                  <Check
                    className={cn(
                      "size-4",
                      selectedFramework!.value === framework.value
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
    </div>
  );
}
