import { cn } from "~/lib/utils";

type tabData = {title: string, isSelected: boolean, onClick: () => void};
type QuickNavbarProps = {tabsData: tabData[]}

/**
 * This navbar component allows you to integrate a quick navbar where the 
 * state of the navbar is not handled by it.
 * @param data 
 * @returns 
 */
export default function QuickNavbar({tabsData} : QuickNavbarProps) {
  return (
    <div className="flex w-full items-center border-b border-cc-border">
      {tabsData.map((item) => (<TabItem
        key={item.title}
        title={item.title}
        isSelected={item.isSelected}
        onClick={item.onClick}
      />))}
    </div>
  );
}

const TabItem = ({
  title,
  isSelected,
  onClick,
}: {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn("app-hover-slight cursor-pointer border-b-[3px] px-3 py-3 flex-1 sm:flex-none text-center", {
        "border-cc-primary": isSelected,
      })}
      onClick={onClick}
    >
      <p className="text-cc-content/70">{title}</p>
    </div>
  );
};