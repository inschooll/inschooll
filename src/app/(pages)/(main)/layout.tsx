import React from "react";
import LeftSidebarWrapper from "~/components/LeftSidebarWrapper";
import StyleAdder from "./style-adder";

export interface LayoutProps {
  children: React.ReactNode;
  params: { school: string };
}

export default function Layout({ children, params }: LayoutProps) {
  console.log(params);

  return (
    <div className="h-[100vh]">
      {/* This component helps add unique css properties to the body element when it mounts */}
      <StyleAdder />

      {/* <MainNavbar schoolName={params.school} /> */}

      <div className="flex h-full justify-stretch bg-cc-background-sub">
        {/* Left navbar */}
        <LeftSidebarWrapper />

        <div className="flex-grow overflow-auto pb-2">{children}</div>
      </div>
    </div>
  );
}


