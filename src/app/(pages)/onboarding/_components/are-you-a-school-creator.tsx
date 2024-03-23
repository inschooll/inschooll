"use client";
import { useContext, useState } from "react";
import { T2 } from "~/components/texts/title";
import {
  ChooseContainer,
  OnboardingButton,
  OnboardingTitleAndDescription,
} from "../page";
import SchoolBenefits from "./school-benefits";
import { OnboardingContext } from "~/lib/context";

const options = [<SchoolBenefits key={1} />, <>Hey</>];
/**
 * This component asks users whether they want to create a school or not. And the next
 * component displayed when the user clicks the continue button would depend on the
 * user selection
 * @returns
 */
export default function AreYouASchoolCreator() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState<number>();

  return (
    <>
      <OnboardingTitleAndDescription
        title="Do you wish to create a School?"
        description=""
      />

      <div className="rounded-lg pt-5 md:flex">
        <ChooseContainer
          className="rounded-t-sm sm:rounded-t-none md:rounded-l-lg"
          isSelected={selectedOptionsIndex == 0}
          onClick={setSelectedOptionsIndex.bind(null, 0)}
        >
          <T2 className="text-cc-content/70">Yes</T2>
        </ChooseContainer>
        <ChooseContainer
          className="rounded-b-sm sm:rounded-b-none md:rounded-r-lg"
          isSelected={selectedOptionsIndex == 1}
          onClick={setSelectedOptionsIndex.bind(null, 1)}
        >
          <T2 className="text-cc-content/70">No</T2>
        </ChooseContainer>
      </div>

      <OnboardingButton
        onClick={
          selectedOptionsIndex != undefined
            ? displayNextComponent?.bind(null, options[selectedOptionsIndex])
            : () => null
        }
      />
    </>
  );
}
