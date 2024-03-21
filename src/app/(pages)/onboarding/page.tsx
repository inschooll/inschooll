"use client";
import React, { createContext, useState } from "react";
import { T2 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Welcome from "./_components/welcome";

export const OnboardingContext = createContext<(v: React.ReactNode) => void | undefined>();

/**
 * This is the official onboarding screen and it works with the below components
 * Welcome
 * SelectTheme
 * AreYouASchoolCreator
 *  - Yes -> SchoolBenefit -> New Page
 *  - No -> 
 * @returns
 */
export default function Page() {
  const [componentHistory, setComponentHistory] = useState<React.ReactNode[]>([]);
  const [component, setComponent] = useState<React.ReactNode>(null);

  const displayComponent = (newDisplayComponent: React.ReactNode) => {
    setComponentHistory((comps) => [...comps, component]);
    setComponent(newDisplayComponent);
  };

  const bottomNavClick = (i: number) => {
    if (i >= componentHistory.length) return;
    setComponent(componentHistory[i]);

    // remove preceding components from history
    setComponentHistory((components) => components.slice(0, i));
  };

  return (
    <OnboardingContext.Provider value={displayComponent}>
      <main>
        <div className="">
          <div className=" bg-lime-2000 mx-auto flex h-screen flex-col items-center justify-center space-y-5 md:max-w-2xl">
            <div className="px-4 md:px-0 py-20">{component ?? <Welcome />}</div>
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <div className="flex gap-5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className={cn("size-2 rounded-full bg-cc-content/20", {
                      "cursor-pointer bg-cc-primary/50":
                        i < componentHistory.length,
                      "cursor-pointer bg-cc-primary":
                        i === componentHistory.length,
                    })}
                    onClick={bottomNavClick.bind(null, i)}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </OnboardingContext.Provider>
  );
}

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

export function OnboardingTitleAndDescription(props: {
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div className={cn("text-center space-y-3 md:space-y-5", props.className)}>
      <T2>{props.title}</T2>
      <p className="sm:text-lg text-cc-content/70">{props.description}</p>
    </div>
  );
}




