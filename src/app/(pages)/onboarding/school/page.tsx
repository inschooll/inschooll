"use client";
import { OnboardingContext } from "~/lib/context";
import { useOnboarding } from "~/lib/hooks";
import DotsNavbar from "../_components/dots-navbar";
import { OnboardingWrapper } from "../page";
import SemesterSetup from "./_components/semester-setup";

/**
 * The onboarding experience after a school was created
 * @returns
 */
export default function Page() {
  const {
    handleDisplayNewComponent,
    component,
    componentHistory,
    bottomNavClick,
  } = useOnboarding();
  const dotsCount = 5;

  return (
    <OnboardingContext.Provider
      value={{ displayNewComponent: handleDisplayNewComponent }}
    >
      <main>
        <div className="">
          <OnboardingWrapper>
            {component ?? <SemesterSetup />}
          </OnboardingWrapper>

          <DotsNavbar
            numberOfDots={dotsCount}
            componentHistory={componentHistory}
            onClick={(i) => bottomNavClick(i)}
          />
        </div>
      </main>
    </OnboardingContext.Provider>
  );
}


