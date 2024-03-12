'use client';
import { FaAnglesLeft } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { useLeftSidebarStore } from "~/store";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function LeftSidebarActivatorButton({}) {
  // grab zustand store data, and update functions
  const {isActive, isMobileActive, setIsActive, setMobileIsActive: setMobileActive} = useLeftSidebarStore()

  return (
    <div
      className="p-2 rounded-lg text-cc-content/50 hover:text-cc-content app-hover cursor-pointer"
      onClick={() => {
        setIsActive(!isActive);
        setMobileActive(!isMobileActive);
      }}
    >
      <HiMenu size={20} />
    </div>
  );
}
