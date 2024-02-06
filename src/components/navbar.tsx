"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "~/lib/utils";

type navItemType = { icon?: string; text: string; href: string }[];
type NavbarProps = {
  navItems: { icon?: string; text: string; href: string }[];
  className?: string;
  ulClassName?: string;
};

/**
 * This navbar component uses the url and props.navItems[nth].href to know
 * which navItem is currently selected.
 * @param props 
 * @returns navbar component
 */
export default function Navbar(props: NavbarProps) {
  const pathname = usePathname();
  const selectedIndex = useMemo(() => {
    let index = 0;
    // set selected sidebar item index
    props.navItems.map((item, i) => {
      if (pathname.startsWith(item.href)) index = i;
    });

    return index;
  }, [pathname, props.navItems]);

  return (
    <nav
      className={cn("block border-b border-cc-border-main", props.className)}
    >
      <ul className={cn("flex justify-stretch gap-4", props.ulClassName)}>
        {props.navItems?.map((item, index) => (
          <NavItem
            item={item}
            key={index}
            isSelected={selectedIndex === index}
          />
        ))}
      </ul>
    </nav>
  );
}

const NavItem = ({
  item,
  isSelected,
}: {
  item: navItemType[0];
  isSelected: boolean;
}) => {
  return (
    <Link href={item.href} className="relative">
      {isSelected && (
        <span className="absolute bottom-0 h-[.2rem] w-full rounded-t bg-cc-primary" />
      )}
      {item?.icon}
      <div
        className={`cursor-pointer font-medium ${isSelected ? "text-cc-content-sub" : "text-cc-content-sub/50"}`}
      >
        <li className={`hover:app-hover mb-1.5 rounded-md px-2 py-0.5`}>
          {item.text}
        </li>
      </div>
    </Link>
  );
};
