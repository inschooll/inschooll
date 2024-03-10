import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMenu } from "react-icons/hi";
import images from "~/lib/constants/images";
import links from "~/lib/constants/links";
import AppLogo from "~/components/app_logo";
import Navbar from "~/components/navbar";
import { Button } from "~/components/ui/button";

export default function BackOfficeHeader() {
  const navItems = [{ text: "/", href: links.backoffice.main }];

  return (
    <header className="border-b border-cc-border bg-cc-background-sub">
      <MenuActivatorAndLogo />

      {/* Navbar */}
      <div className="px-4 pt-1">
        <Navbar navItems={navItems} className="border-0" />
      </div>
    </header>
  );
}

function MenuActivatorAndLogo() {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Menu Button */}
      <Button
        variant={"secondary"}
        size={"icon"}
        className="rounded-lg text-cc-content/50 hover:bg-transparent hover:text-cc-content"
      >
        <HiMenu size={20} />
      </Button>

      {/* Logo */}
      <Link href={links.dashboard}>
        <AppLogo size="lg" showAppName={false} />
      </Link>

      {/* School btn */}
      <Button variant={"secondary"} className="ml-5 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            src={images.logos.bingham}
            alt="school logo"
            width={17}
            height={17}
          />
          <p>Bingham University</p>
        </div>
      </Button>
    </div>
  );
}
