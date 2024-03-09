"use client";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";
import { getCookie, setCookie } from "cookies-next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Ttheme } from "~/app/utils/types";


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
  const getTheme = () => getCookie("theme") as Ttheme;
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getTheme);
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]);

  useEffect(() => {
    setSelectedFramework(() => {
      if (theme === frameworks[0]?.value) return frameworks[0];
      if (theme === frameworks[1]?.value) return frameworks[1];
      return frameworks[2];
    })
  }, [])

  const updateTheme = (theme: Ttheme) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    setCookie("theme", theme);
    setTheme(theme);
  };

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
              {frameworks.map((framework, i) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className={cn("flex items-center justify-between")}
                  onSelect={(currentValue) => {
                    setSelectedFramework(framework);
                    updateTheme(currentValue as Ttheme);
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
