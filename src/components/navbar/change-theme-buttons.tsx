"use client";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaDesktop } from "react-icons/fa";

type themeModes = "dark" | "light" | "system";

export default function ChangeThemeButtons() {
  const [theme, setTheme] = useState<themeModes>("system");
  
  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? '';

    if (["dark", "light", "system"].includes(theme)) {
      setTheme(theme as themeModes);
      updateAttribute(theme as themeModes);
    }
  }, []);
  
  const updateTheme = () => {
    const html = document.documentElement;
    const theme = html.getAttribute('data-theme');
    
    if (theme === "dark") {
      updateAttribute("light");
      setTheme("light");
      localStorage.setItem('theme', 'light');
    }
    else {
      updateAttribute("dark");
      setTheme("dark");
      localStorage.setItem('theme', 'dark');
    }
    // if (theme === "system") updateAttribute("system"); setTheme("system");
  }
  
  const updateAttribute = (theme: themeModes) => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
  }

  return (
    <div>
      {/* light */}
      <div className="flex justify-center items-center h-8 w-8 rounded-full app-hover cursor-pointer" onClick={updateTheme}>
        {theme === "dark" && <MdOutlineLightMode className="text-cc-content-sub hover:text-cc-content-main" />}
        {theme === "light" && <MdOutlineDarkMode className="text-cc-content-sub hover:text-cc-content-main" />}
        {theme === "system" && <FaDesktop className="text-cc-content-sub hover:text-cc-content-main" />}
      </div>
    </div>
  );
}