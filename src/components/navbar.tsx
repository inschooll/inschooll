import Link from "next/link";
import { cn } from "~/lib/utils";

type navItemType = {icon?: string; text: string, href: string }[];

/**
 * navItems[i].href and selectedTab are compared to know which navItem is selected.
 * ex
 * navItems.href = '/q=about'
 * selectedTab = 'about'
 * 
 */
type NavbarProps = {
  navItems: {icon?: string; text: string, href: string }[];
  className?: string;
  ulClassName?: string;
  selectedTab: string | undefined;  // expect e.g 'home' or 'about' or undefined (this should mean we are at the 1st navItem)
};

export default function Navbar(props: NavbarProps) {
  const NavItem = ({ index, item }: { index: number; item: navItemType[0] }) => {
    const href = item.href.substring(3,); // ?q=about -> about
    const isSelected = (props.selectedTab === undefined && index === 0) || (props.selectedTab === href);

    return (
      <Link href={item.href} className="relative">
          {isSelected && (
            <span className="absolute bottom-0 h-[.2rem] w-full rounded-t bg-cc-primary" />
          )}
          {item?.icon}
          <div
            className={`cursor-pointer font-medium ${isSelected ? "text-cc-content-sub" : "text-cc-content-sub/50"}`}
          >
            <li
              className={`hover:app-hover mb-1.5 rounded-md px-2 py-0.5`}
            >
              {item.text}
            </li>
          </div>
      </Link>
    );
  }

  return (
    <nav className={cn("block border-b border-cc-border-main", props.className)}>
      <ul className={cn("flex justify-stretch gap-4", props.ulClassName)}>
        {props.navItems?.map((item, index) => (
          <NavItem index={index} item={item} key={index} />
        ))}
      </ul>
    </nav>
  );
}
