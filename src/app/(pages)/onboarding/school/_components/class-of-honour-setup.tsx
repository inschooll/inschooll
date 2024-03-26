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
import IDNumberSetup from "./id-number-setup";

const defaultGradePointItem = { from: 0, to: 0, honor: "" };
type TGradePoint = typeof defaultGradePointItem;

export default function ClassOfHonorSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <IDNumberSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TGradePoint>(defaultGradePointItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Class of honor setup"
        description="These are undergraduate degrees awarded to acknowledge outstanding academic achievement."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-9 gap-2">
          <Label value="CGPA" className="col-span-4 uppercase" />
          <Label value="Honor" className="col-span-4" />
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

    if (name === "from") {
      const valueToInt = parseInt(value);
      if (valueToInt < 0) return;
      update({ ...gradePoint, from: valueToInt });
    }
    if (name === "to") {
      const valueToInt = parseInt(value);
      if (valueToInt < 0) return;
      update({ ...gradePoint, to:  valueToInt});
    }
    if (name === "honor") {
      update({ ...gradePoint, honor:  value});
    }
  };

  return (
    <div className="grid grid-cols-9 gap-2 ">
      <div className="col-span-2">
        <Input value={gradePoint.from} type="number" name="from" className="w-full" onChange={onChange}/>
      </div>
      <div className="col-span-2">
        <Input value={gradePoint.to} type="number" name="to" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-4">
        <Input value={gradePoint.honor} type="text" name="honor" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

