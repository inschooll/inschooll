import Link from "next/link";
import AppLogo from "../app_logo";
import links from "~/app/core/constants/links";
import ChangeThemeButtons from "./change-theme-buttons";

export default function MainNavbar({schoolName}: {schoolName: string}) {
  
  return (
    <nav>
      <div className="flex items-center bg-cc-background-sub border-b border-cc-border-main h-11">
        <div className="mx-5 sm:mx-5 w-full">

          <div className="flex items-center justify-between">
            {/* logo */}
            <Link href={links.dashboard(schoolName)} data-testid="logo-button">
              <AppLogo variance="sm" />
            </Link>

            {/* Buttons to toggle Light mode and dark mode */}
            <ChangeThemeButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}