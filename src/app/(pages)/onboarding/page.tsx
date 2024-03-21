"use client";
import React, { useState } from "react";
import { T2 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import { OnboardingContext } from "~/lib/context";
import { cn } from "~/lib/utils";
import Welcome from "./_components/welcome";

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
  const [componentHistory, setComponentHistory] = useState<React.ReactNode[]>(
    [],
  );
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
            <div className="px-4 py-20 md:px-0">{component ?? <Welcome />}</div>
          </div>

          <BottomNav
            length={5}
            componentHistory={componentHistory}
            onClick={(i) => bottomNavClick(i)}
          />
        </div>
      </main>
    </OnboardingContext.Provider>
  );
}

function BottomNav(props: {
  length: number;
  componentHistory: unknown[];
  onClick: (i: number) => void;
}) {
  const dots = Array(props.length).fill("");

  const Dot = ({ i }: { i: number }) => (
    <div
      key={i}
      className={cn("size-2 rounded-full bg-cc-content/20", {
        "cursor-pointer bg-cc-primary/50": i < props.componentHistory.length,
        "cursor-pointer bg-cc-primary": i === props.componentHistory.length,
      })}
      onClick={() => props.onClick(i)}
    />
  );
  
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
      <div className="flex gap-5">
        {dots.map((_, i) => (<Dot key={i} i={i} />))}
      </div>
    </div>
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
    <div className={cn("space-y-3 text-center md:space-y-5", props.className)}>
      <T2>{props.title}</T2>
      {!!props.description && <p className="text-cc-content/70 sm:text-lg">{props.description}</p>}
    </div>
  );
}
