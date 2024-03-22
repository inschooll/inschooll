import { useContext } from "react";
import { OnboardingContext } from "~/lib/context";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import OnboardingCard from "../../_components/onboarding-card";


export default function DegreeSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <>Next</>;

  return (
    <>
      <div className="space-y-8 text-center">
        <OnboardingTitleAndDescription
          title="Semester setup"
          description="Start and end date of the semester, breaks, exams."
        />
          <OnboardingCard>
            Degree Setup
          </OnboardingCard>
      </div>

      <OnboardingButton
        onClick={displayNextComponent?.bind(null, nextComponent)}
      />
    </>
  );
}

