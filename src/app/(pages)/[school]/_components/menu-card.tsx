'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import links from "~/app/core/constants/links";

type ComponentProps = {
  title: string;
  icon: React.ReactNode;
  schoolName: string;
  navigateTo: string;
};

export default function MenuCard({
  title,
  icon,
  schoolName,
  navigateTo,
}: ComponentProps) {
  const pathname = usePathname();
  const isSelected = pathname.includes(navigateTo);

  const textStyle = isSelected ? "text-cc-content-main/80" : "text-cc-content-main/60";
  const iconStyle = isSelected ? "text-cc-content-main" : "text-cc-content-main/50";
  const bgStyle = isSelected ? "bg-cc-border-main/50" : "";

  // add props to icon
  const IconWithProps = React.Children.map(icon, child => {
    if (React.isValidElement(child)){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return React.cloneElement(child,{className: `${iconStyle}`})
    }
    return child;
  })
  
  return (
    <Link href={navigateTo}>
      <div
        className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 app-hover ${bgStyle}`}
      >
        {IconWithProps}
        <p className={`font-medium capitalize ${textStyle}`}>{title}</p>
      </div>
    </Link>
  );
}