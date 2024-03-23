"use client";
import React, { useState } from "react";
import { T2 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import { OnboardingContext } from "~/lib/context";
import { cn } from "~/lib/utils";
import Welcome from "./_components/welcome";
import { useOnboarding } from "~/lib/hooks";
import DotsNavbar from "./_components/dots-navbar";

/**
 * This is the official onboarding screen and it it initially displays the Welcome component
 * 
 * Order of components displayed are as follows:
 * - Welcome
 * - SelectTheme
 * - AreYouASchoolCreator
 *  - - Yes -> SchoolBenefit -> New Page
 *  - - No ->
 * @returns
 */
export default function Page() {
  const {handleDisplayNewComponent, component, componentHistory, bottomNavClick} = useOnboarding();

  return (
    <OnboardingContext.Provider value={{displayNewComponent: handleDisplayNewComponent}}>
      <main>
          <OnboardingWrapper>
            {component ?? <Welcome />}
          </OnboardingWrapper>

          <DotsNavbar
            numberOfDots={5}
            componentHistory={componentHistory}
            onClick={(i) => bottomNavClick(i)}
          />
      </main>
    </OnboardingContext.Provider>
  );
}

export const OnboardingWrapper = ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="relative bg-lime-2000 mx-auto flex min-h-dvh flex-col items-center justify-center space-y-5 md:max-w-2xl">
      <div className="px-4 py-28">{children}</div>
    </div>
  );
};

export function OnboardingButton({
  title,
  onClick,
}: {
  title?: string;
  onClick?: () => void;
}) {
  return (
    <div className="mx-auto w-full pt-10 md:w-96">
      <Button size={"lg"} className="w-full rounded-sm py-6" onClick={onClick}>
        {title ?? "Continue"}
      </Button>
    </div>
  );
}

/**
 * This is a container that can be selected or deselected
 * @param props 
 * @returns 
 */
export function ChooseContainer(props: {
  children: React.ReactNode | string;
  className?: string;
  isSelected?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "flex h-[11rem] w-full cursor-pointer items-center justify-center border border-cc-border transition duration-200 hover:bg-slate-500/5 md:h-[11.5rem] md:w-72",
        props.className,
        {
          "border-2 border-cc-primary bg-slate-500/5 hover:bg-slate-500/10":
            props.isSelected,
        },
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

/**
 * This is a component that displays a bold title and a 
 * description beneath the bold title
 * @param props 
 * @returns 
 */
export function OnboardingTitleAndDescription(props: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 text-center md:space-y-5 pb-8", props.className)}>
      <T2>{props.title}</T2>
      {!!props.description && <p className="text-cc-content/70 sm:text-lg">{props.description}</p>}
    </div>
  );
}
