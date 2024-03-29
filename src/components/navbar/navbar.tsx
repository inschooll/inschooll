import Link from "next/link";
import links from "~/lib/constants/links";
import AppLogo from "../app_logo";

export default function TopNavbar() {
  return (
    <nav>
      <div className="flex items-center border-b border-cc-border-main h-16">
        <div className="mx-5 sm:mx-10 w-full">

          <div className="flex items-center justify-between">
            {/* logo */}
            <Link href={links.landingPage} data-testid="logo-button">
              <AppLogo/>
            </Link>

            {/* <NavbarRightSection user={user} /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

