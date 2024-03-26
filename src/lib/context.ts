import { createContext } from "react";

type TOnboardingContext = {
  updateDotsCount?: (count: number) => void,
  displayNewComponent?: (v: React.ReactNode) => void | undefined,
};

export const OnboardingContext = createContext<TOnboardingContext>({});

export const SemesterContext = createContext<{semesterCount: number} | null>(null);
