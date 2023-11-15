"use client";

import Link from "next/link";
import { useState } from "react";
import links from "~/app/core/constants/links";
import Button from "../buttons/button";
import MenuCancelButton from "../buttons/menu_cancel_button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface UserProps {
  user?: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export function NavbarRightSection({ user }: UserProps) {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const handleMenuClick = (value: boolean) => {
    setShowMenuDropdown(value);
  };
  
  return (
    <>
      {/* links / buttons */}
      {!user ? (
        <>
          <div className="hidden gap-2 lg:flex" data-testid="">
            <Link href={links.login} data-testid="login-button">
              <Button variant={"noBackground"}>Log in</Button>
            </Link>
            <Link href={links.signup} data-testid="signup-button">
              <Button variant={"default"} className="px-10">
                Sign up
              </Button>
            </Link>
          </div>

          <div className="lg:hidden">
            <MenuCancelButton
              showMenu={showMenuDropdown}
              onClick={() => handleMenuClick(!showMenuDropdown)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <p>{user?.name}</p>
          <div className="h-7 w-7 overflow-hidden rounded-full">
            <Image
              src={user?.image ?? ""}
              alt="profile picture"
              width={0}
              height={0}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Logout */}
          <div>
            <p onClick={() => signOut()}>Log out</p>
          </div>
        </div>
      )}

      {showMenuDropdown && (
        <DropdownMenu
          isLoggedIn={user != null}
          pressCloseDropdownMenu={() => setShowMenuDropdown(false)}
        />
      )}
    </>
  );
}

const DropdownMenu = ({
  isLoggedIn,
  pressCloseDropdownMenu,
}: {
  isLoggedIn: boolean
  pressCloseDropdownMenu: () => void;
}) => {

  return (
    <div className="w absolute left-0 top-[76px] z-10 block h-4/5 w-full border-b border-cc-border-main bg-cc-background-main lg:hidden">
      <div className="mx-5 flex flex-col justify-stretch py-3 sm:mx-10 sm:py-5">
        {!isLoggedIn && (
          <>
            <Link href={links.login} onClick={pressCloseDropdownMenu}>
              <Button variant={"outlineFull"} size={"sm"} className="block">
                Log in
              </Button>
            </Link>
            <Link href={links.signup} onClick={pressCloseDropdownMenu}>
              <Button variant="defaultFull" size={"sm"} className="mt-2 block">
                Sign up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
