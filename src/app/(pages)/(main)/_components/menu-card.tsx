'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";

type ComponentProps = {
  title: string;
  icon: React.ReactNode;
  navigateTo: string;
};

export default function MenuCard({
  title,
  icon,
  navigateTo,
}: ComponentProps) {
  const pathname = usePathname();
  const isSelected = pathname.includes(navigateTo);

  const textStyle = isSelected ? "text-cc-primary" : "text-cc-content-main/60";
  const iconStyle = isSelected ? "text-cc-primary" : "text-cc-content-main/50";
  const bgStyle = isSelected ? "bg-cc-sidebar-bg hover:bg-cc-sidebar-bg-hover" : "";

  // add props to icon
  const IconWithProps = React.Children.map(icon, child => {
    if (React.isValidElement(child)){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return React.cloneElement(child,{className: `${iconStyle}`});
    }
    return child;
  })
  
  return (
    <Link href={navigateTo}>
      <div
        className={cn("relative flex cursor-pointer text-cc-primary items-center gap-3 rounded-md px-3 py-2 hover:bg-cc-sidebar-bg-hover transition-all duration-200", bgStyle)}
      >
        {!!isSelected && (<span className="absolute left-0 h-4 w-[.28rem] bg-cc-primary rounded-r-md" />) }

        {IconWithProps}
        <p className={cn("font-medium capitalize", textStyle)}>{title}</p>
      </div>
    </Link>
  );
}