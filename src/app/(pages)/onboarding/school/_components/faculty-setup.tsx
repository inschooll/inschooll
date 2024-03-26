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
import DepartmentSetup from "./department-setup";

const defaultFacultyItem = { title: "", code: "" };
type TFaculty = typeof defaultFacultyItem;

export default function FacultySetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <DepartmentSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TFaculty>(defaultFacultyItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Faculty setup"
        description="The faculties that exist in the school."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-8 gap-2">
          <Label value="Faculty title" className="col-span-5" />
          <Label value="code" className="col-span-2" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <FacultyInputTile
            key={i}
            faculty={fieldData}
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


type FacultyInputTileProps = {
  faculty: TFaculty;
  remove: () => void;
  update: (d: TFaculty) => void;
};
const FacultyInputTile = ({ faculty: faculty, remove, update }: FacultyInputTileProps) => {
  // updates the input of only Faculty & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      update({ ...faculty, title: value });
    }
    if (name === "code") {
      update({ ...faculty, code: value });
    }
  };

  return (
    <div className="grid grid-cols-8 gap-2 ">
      <div className="col-span-5">
        <Input value={faculty.title} type="text" name="title" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Input value={faculty.code} type="text" name="code" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

