import { cn } from "~/lib/utils";

type navItemType = { icon?: string; text: string;}[];
type NavbarProps = {
  navItems: { icon?: string; text: string; }[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  className?: string;
  ulClassName?: string;
};

/**
 * This navbar uses index numbers to know which navItem is currently selected
 * @param props 
 * @returns navbar component
 */
export default function NavbarWithIndex(props: NavbarProps) {

  return (
    <nav
      className={cn("block border-b border-cc-border-main overflow-x-auto scrollbar-hidden", props.className)}
    >
      <ul className={cn("flex justify-stretch gap-4 w-2", props.ulClassName)} style={{width: '10px'}}>
        {props.navItems?.map((item, index) => (
          <NavItem
            item={item}
            key={index}
            isSelected={props.selectedIndex === index}
            onClick={() => props.setSelectedIndex(index)}
          />
        ))}
      </ul>
    </nav>
  );
}

const NavItem = ({
  item,
  isSelected,
  onClick,
}: {
  item: navItemType[0];
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="relative">
      {isSelected && (
        <span className="absolute bottom-0 h-[.1rem] w-full bg-cc-primary" />
      )}
      {item?.icon}
      <div
        className={`cursor-pointer font-medium ${isSelected ? "text-cc-content-sub" : "text-cc-content-sub/50"}`}
      >
        <li className={`hover:app-hover mb-1.5 rounded-md px-2 py-0.5 whitespace-nowrap`} onClick={onClick}>
          {item.text}
        </li>
      </div>
    </div>
  );
};
