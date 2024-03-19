import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

type SidebarTabProp = {
  title: string;
  count?: number;
  isOpen: boolean;
  onClick: () => void;
};

/**
 * This is a sidebar tab item, when clicked on it runs the onClick prop passed to it
 * @param 
 * @returns 
 */
export default function RightSidebarTab({ title, count, onClick, isOpen }: SidebarTabProp) {
  return (
    <div
      className={cn(
        "app-hover-slight flex cursor-pointer select-none items-center justify-between p-3",
        { "border-b border-cc-border": !isOpen },
      )}
      onClick={onClick}
    >
      <p>{title}</p>
      <div className="flex items-center gap-2">
        {!!count && <Pill className="">{count}</Pill>}
        <ChevronDown size={16} />
      </div>
    </div>
  );
}


type PillProps = {
  children: React.ReactNode;
  className: string;
};

function Pill({ children, className }: PillProps) {
  return (
    <div
      className={cn(
        "flex h-5 items-center rounded-lg bg-[#F04842] px-2 text-xs font-semibold text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}