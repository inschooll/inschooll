import { cn } from "~/lib/utils";

export default function OnboardingCard({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("app-box-shadow w-full rounded-lg p-7 text-left md:w-[36rem] mx-auto", className)}>
      {children}
    </div>
  );
}