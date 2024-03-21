"use client";
import { useContext, useState } from "react";
import { T2 } from "~/components/texts/title";
import { ChooseContainer, OnboardingButton, OnboardingContext, OnboardingTitleAndDescription } from "../page";
import SchoolBenefits from "./school-benefits";

export default function AreYouASchoolCreator() {
  const displayNextComponent = useContext(OnboardingContext);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const options = [<SchoolBenefits key={1} />, <>Hey</>];

  return (
    <>
      <div className="space-y-8 text-center">
        <OnboardingTitleAndDescription
          title="Do you wish to create a School?"
          description=""
        />

        <div className="rounded-lg pt-5 md:flex">
          <ChooseContainer
            className="rounded-t-sm sm:rounded-t-none md:rounded-l-lg"
            isSelected={selectedIndex == 0}
            onClick={setSelectedIndex.bind(null, 0)}
          >
            <T2 className="text-cc-content/70">Yes</T2>
          </ChooseContainer>
          <ChooseContainer
            className="rounded-b-sm sm:rounded-b-none md:rounded-r-lg"
            isSelected={selectedIndex == 1}
            onClick={setSelectedIndex.bind(null, 1)}
          >
            <T2 className="text-cc-content/70">No</T2>
          </ChooseContainer>
        </div>
      </div>

      <OnboardingButton
        onClick={
          selectedIndex != undefined
            ? displayNextComponent.bind(null, options[selectedIndex])
            : () => null
        }
      />
    </>
  );
}