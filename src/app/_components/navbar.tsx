"use client";
import { useState } from "react";

type navItemType = {icon?: string, text: string}[];

export default function Navbar({navItems, defaultSelected=0, updateSelected, ulClassName=''} : {navItems: navItemType, defaultSelected?: number, ulClassName?: string, updateSelected: (index: number) => void}) {
  const selectedStyle = "border-b-[3px] border-cc-content-main/70";
  const hoverStyle = "hover:border-b-[3px] hover:border-cc-content-main/40";

  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

  const update = (index: number) => {
    setSelectedIndex(index);
    updateSelected(index);
  }

  function NavItem({index, item} : {index: number, item: navItemType[0]}) {
    return (
      <div className={selectedIndex === index ? selectedStyle : hoverStyle}>
        {item?.icon}
        <li className={`cursor-pointer px-1 py-[10px] font-medium ${selectedIndex === index ? "text-cc-content-sub" : "text-cc-content-sub/50"}`} onClick={() => update(index)}>{item.text}</li>
      </div>
    );
  }

  return (
    <nav className="block border-b border-cc-border-main">
      <ul className={`flex justify-stretch gap-4 ${ulClassName}`}>
        {navItems?.map((item, index) => (<NavItem index={index} item={item} key={index} />))}
      </ul>
    </nav>
  );
}
