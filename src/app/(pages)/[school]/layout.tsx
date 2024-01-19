import React from "react";
import StyleAdder from "./style-adder";
import Sidebar from "~/components/sidebar";

export interface LayoutProps { 
  children: React.ReactNode; 
  params: { school: string } 
}

export default function Layout({ children, params }: LayoutProps) {
  console.log(params);

  return (
    <div className="h-[100vh]">
      {/* This fragment component helps add unique css properties to the body element when it mounts */}
      <StyleAdder />

      {/* <MainNavbar schoolName={params.school} /> */}

      <div className="flex h-full bg-cc-background-sub justify-stretch">
        {/* Left navbar */}
        <Sidebar schoolName={params.school} />

        <div className="flex-grow overflow-auto py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
