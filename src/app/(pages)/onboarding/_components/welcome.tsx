"use client";
import { useContext } from "react";
import { Logo } from "~/components/app_logo";
import { T1 } from "~/components/texts/title";
import constants from "~/lib/constants/constants";
import { OnboardingButton, OnboardingContext } from "../page";
import SelectTheme from "./select-theme";


export default function Welcome() {
  const displayNextComponent = useContext(OnboardingContext);
  const nextComponent = <SelectTheme />;

  return (
    <>
      <div className="flex flex-col items-center gap-y-5 text-center">
        <Logo className="scale-[2]" />
        <div className="space-y-3 pt-5">
          <T1 className="font-bold text-cc-content/80">
            Welcome to {constants.appName}
          </T1>
          <p className="pt-2 text-lg text-cc-content/70">
            The ultimate school management system.
          </p>
        </div>
      </div>

      <OnboardingButton
        onClick={displayNextComponent.bind(null, nextComponent)}
      />
    </>
  );
}