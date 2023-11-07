"use client";

import Button from "../buttons/button";
import Link from "next/link";
import { useState } from "react";
import MenuCancelButton from "../buttons/menu_cancel_button";
import AppLogo from "../app_logo";
import links from "~/app/core/constants/links";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  return (
    <SessionProvider>
      <Body />
    </SessionProvider>
  );
}
function Body() {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const session = useSession({
    required: false,
    onUnauthenticated() {
      console.log('DO SOMETHING!')
    }
  });
  const user = session.data?.user;

  const handleMenuClick = (value: boolean) => {
    setShowMenuDropdown(value);
  };

  return (
    <nav>
      <div className="flex items-center border-b border-cc-border-main h-16">
        <div className="mx-5 sm:mx-10 w-full">

          <div className="flex items-center justify-between">
            {/* logo */}
            <Link href={links.landingPage} data-testid="logo-button">
              <AppLogo />
            </Link>

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
                <div className="rounded-full overflow-hidden w-7 h-7">
                  <Image src={user?.image ?? ''} alt="profile picture" width={0} height={0} className="w-full h-full object-cover object-center"  />
                </div>

                {/* Logout */}
                <div>
                  <p onClick={() => signOut()}>Log out</p>
                </div>
              </div>
            )}
          </div>

          {showMenuDropdown && <DropdownMenu pressCloseDropdownMenu={() => setShowMenuDropdown(false)} />}
        </div>
      </div>
    </nav>
  );
}

const DropdownMenu = ({pressCloseDropdownMenu}: {pressCloseDropdownMenu: () => void}) => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="w absolute left-0 top-[76px] z-10 block h-4/5 w-full border-b border-cc-border-main bg-cc-background-main lg:hidden">
      <div className="mx-5 flex flex-col justify-stretch py-3 sm:mx-10 sm:py-5">
        {user == null && (
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
