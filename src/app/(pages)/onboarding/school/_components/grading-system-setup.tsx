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
import GradePointSetup from "./grade-point-and-description-setup";

const defaultGradeItem = { title: "", from: 0, to: 0 };
type TGrade = typeof defaultGradeItem;

export default function GradingSystemSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <GradePointSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TGrade>(defaultGradeItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Grading system setup"
        description="The grading system for a school is a standardized method used for measuring levels to students achievements."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-9 gap-2">
          <Label value="Grade letter" className="col-span-4" />
          <Label value="From" className="col-span-2" />
          <Label value="To" className="col-span-2" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <GradeInputTile
            key={i}
            grade={fieldData}
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


type GradeInputTileProps = {
  grade: TGrade;
  remove: () => void;
  update: (d: TGrade) => void;
};
const GradeInputTile = ({ grade, remove, update }: GradeInputTileProps) => {
  // updates the input of only Grade & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      update({ ...grade, title: value });
    }
    if (name === "from") {
      const valueToInt = parseInt(value);
      if (valueToInt < 0) return;
      update({ ...grade, from:  valueToInt});
    }
    if (name === "to") {
      const valueToInt = parseInt(value);
      if (valueToInt < 0) return;
      update({ ...grade, to:  valueToInt});
    }
  };

  return (
    <div className="grid grid-cols-9 gap-2 ">
      <div className="col-span-4">
        <Input value={grade.title} type="text" name="title" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Input value={grade.from} type="number" name="from" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Input value={grade.to} type="number" name="to" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

