"use client";
import { useState } from "react";

type navItemType = {icon?: string, text: string}[];

export default function Navbar({navItems, defaultSelected=0, updateSelected, ulClassName=''} : {navItems: navItemType, defaultSelected?: number, ulClassName?: string, updateSelected: (index: number) => void}) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

  const update = (index: number) => {
    setSelectedIndex(index);
    updateSelected(index);
  }

  function NavItem({index, item} : {index: number, item: navItemType[0]}) {
    return (
      <div className='relative'>
        {selectedIndex === index && (<span className="absolute w-full h-[.2rem] bg-cc-primary bottom-0 rounded-t" />)}
        {item?.icon}
        <div className={`cursor-pointer font-medium ${selectedIndex === index ? "text-cc-content-sub" : "text-cc-content-sub/50"}`}>
          <li className={`hover:app-hover px-2 py-0.5 mb-1.5 rounded-md`} onClick={() => update(index)}>{item.text}</li>
        </div>
      </div>
    );
  }

  return (
    <nav className="block border-b border-cc-border-main">
      <ul className={`flex justify-stretch gap-2 ${ulClassName}`}>
        {navItems?.map((item, index) => (<NavItem index={index} item={item} key={index} />))}
      </ul>
    </nav>
  );
}
