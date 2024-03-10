'use client';
import React from "react";
import LeftSidebarWrapper from "~/components/LeftSidebarWrapper";
import StyleAdder from "./style-adder";
import { useLeftSidebarStore } from "~/store";
import { cn } from "~/lib/utils";

export interface LayoutProps {
  children: React.ReactNode;
  params: { school: string };
}

export default function Layout({ children, params }: LayoutProps) {
  const isLeftSidebarActive = useLeftSidebarStore(state => state.isActive);

  return (
    <div className="h-[100vh]">
      {/* This component helps add unique css properties 
      to the body element when it mounts */}
      <StyleAdder />

      <div className="flex h-full justify-stretch bg-cc-background-sub">
        {/* sidebar */}
        <LeftSidebarWrapper sidebarClassName="w-64" />

        {/* page */}
        <div className={cn('w-full overflow-auto', {"lg:w-[calc(100%-var(--left-side-bar-width))]": isLeftSidebarActive})}>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
