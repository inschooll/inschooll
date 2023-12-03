"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CaseNavbar() {
  const navItems = ["Scheduled Hearing", "Open Cases", "Closed Cases"];
  const selectorsData = {
    "Scheduled Hearing": {x: 28, y: 0, width: navItems[0]!.length * 9},
    "Open Cases": {x: 215, y: 0, width: navItems[1]!.length * 9.7},
    "Closed Cases": {x: 355, y: 0, width: navItems[2]!.length * 8.8},
  };
  const [selectorData, setSelectorData] = useState(selectorsData['Open Cases']);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const updateIndex = (index: number) => {
    switch (index) {
      case 0:
        setSelectedIndex(0);
        return setSelectorData(selectorsData['Scheduled Hearing']);
        case 1:
        setSelectedIndex(1);
        return setSelectorData(selectorsData['Open Cases']);
        case 2:
        setSelectedIndex(2);
        return setSelectorData(selectorsData['Closed Cases']);
    }
  }
  
  return (
    <nav className="block border-b-2 border-cc-border-main">
      <ul className="flex justify-stretch px-7">
        <li className={`cursor-pointer px-2 pr-7 py-[10px] font-medium ${selectedIndex === 0 ? "text-cc-content-sub" : "text-cc-content-sub/50"}`} onClick={() => updateIndex(0)}>{navItems[0]}</li>
        <li className={`cursor-pointer px-7 py-[10px] font-medium ${selectedIndex === 1 ? "text-cc-content-sub" : "text-cc-content-sub/50"}`} onClick={() => updateIndex(1)}>{navItems[1]}</li>
        <li className={`cursor-pointer px-7 py-[10px] font-medium ${selectedIndex === 2 ? "text-cc-content-sub" : "text-cc-content-sub/50"}`} onClick={() => updateIndex(2)}>{navItems[2]}</li>
      </ul>
      <motion.div
        className="h-[2px] w-14 bg-cc-content-main rounded"
        animate={{
          x: selectorData.x,
          y: selectorData.y,
          width: selectorData.width,
        }}
      ></motion.div>
    </nav>
  );
}
