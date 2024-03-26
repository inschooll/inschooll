import { type ChangeEvent, useContext } from "react";
import {
  AddButton,
  RemoveButton,
} from "~/components/buttons/composite-buttons";
import Input from "~/components/inputs/input";
import Label from "~/components/inputs/label";
import {
  Combobox,
  type ComboboxFrameworks,
} from "~/components/ui/custom/combobox";
import constants from "~/lib/constants/constants";
import { OnboardingContext } from "~/lib/context";
import { useManageFields } from "~/lib/hooks";
import OnboardingCard from "../../_components/onboarding-card";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import FacultySetup from "./faculty-setup";

const defaultDegreeItem = { title: "", acronym: "", type: "" };
type TDegree = typeof defaultDegreeItem;

export default function DegreeSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <FacultySetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TDegree>(defaultDegreeItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Degree setup"
        description="Degrees supported by the school."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-8 gap-2">
          <Label value="Degree title" className="col-span-3" />
          <Label value="Acronym" className="col-span-2" />
          <Label value="Type" className="col-span-2" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <DegreeInputTile
            key={i}
            degree={fieldData}
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

const degreeTypesFramework: ComboboxFrameworks[] = [
  { label: constants.degrees.associate, value: constants.degrees.associate },
  { label: constants.degrees.bachelors, value: constants.degrees.bachelors },
  { label: constants.degrees.masters, value: constants.degrees.masters },
  { label: constants.degrees.doctorate, value: constants.degrees.doctorate },
];

type DegreeInputTitleProps = {
  degree: TDegree;
  remove: () => void;
  update: (d: TDegree) => void;
};
const DegreeInputTile = ({ degree, remove, update }: DegreeInputTitleProps) => {
  // updates the input of only degree & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      update({ ...degree, title: value });
    }
    if (name === "acronym") {
      update({ ...degree, acronym: value });
    }
  };

  const updateDegreeType = (dType?: string) => {
    update({ ...degree, type: dType ?? "" });
  };

  return (
    <div className="grid grid-cols-8 gap-2 ">
      <div className="col-span-3">
        <Input value={degree.title} type="text" name="title" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Input value={degree.acronym} type="text" name="acronym" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Combobox
          frameworks={degreeTypesFramework}
          defaultSelectedFramework={degreeTypesFramework.find(
            (framework) => framework.value === degree.type,
          )}
          onChange={(i) => updateDegreeType(degreeTypesFramework[i]?.value)}
          className="w-full"
        />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

