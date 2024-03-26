import { type ChangeEvent, useContext } from "react";
import {
  AddButton,
  RemoveButton,
} from "~/components/buttons/composite-buttons";
import Input from "~/components/inputs/input";
import Label from "~/components/inputs/label";
import { OnboardingContext } from "~/lib/context";
import { useManageFields } from "~/lib/hooks";
import OnboardingCard from "../../_components/onboarding-card";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import ClassOfHonorSetup from "./class-of-honour-setup";

const defaultGradePointItem = { grade: "", gradePoint: 0, description: "" };
type TGradePoint = typeof defaultGradePointItem;

export default function GradePointSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <ClassOfHonorSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TGradePoint>(defaultGradePointItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Grade point setup"
        description="Grade point is a number that is vital in the calculation of GPA and CGPA."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-9 gap-2">
          <Label value="Grade" className="col-span-2" />
          <Label value="Grade point" className="col-span-2" />
          <Label value="Description" className="col-span-4" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <GradePointInputTile
            key={i}
            gradePoint={fieldData}
            remove={() => removeFieldAt(i)}
            update={(field) => updateFieldAt(field, i)}
          />
        ))}
        <AddButton title="Add another" onClick={addNewField} />
      </OnboardingCard>

      <OnboardingButton onClick={onSubmit} />
    </>
  );
}


type GradePointInputTileProps = {
  gradePoint: TGradePoint;
  remove: () => void;
  update: (d: TGradePoint) => void;
};
const GradePointInputTile = ({ gradePoint, remove, update }: GradePointInputTileProps) => {
  // updates the input of only GradePoint & description
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "description") {
      update({ ...gradePoint, grade: value });
    }
    if (name === "grade_point") {
      const valueToInt = parseInt(value);
      if (valueToInt < 0) return;
      update({ ...gradePoint, gradePoint:  valueToInt});
    }
  };

  return (
    <div className="grid grid-cols-9 gap-2 ">
      <div className="col-span-2">
        <Input value={gradePoint.grade} type="text" name="grade" className="w-full"/>
      </div>
      <div className="col-span-2">
        <Input value={gradePoint.gradePoint} type="number" name="grade_point" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-4">
        <Input value={gradePoint.description} type="text" name="description" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

