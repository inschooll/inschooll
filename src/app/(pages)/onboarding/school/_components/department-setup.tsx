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
import { OnboardingContext } from "~/lib/context";
import { useManageFields } from "~/lib/hooks";
import OnboardingCard from "../../_components/onboarding-card";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import OfficeSetup from "./office-setup";

const defaultDepartmentItem = { title: "", code: "", faculty: "" };
type TDepartment = typeof defaultDepartmentItem;

export default function DepartmentSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <OfficeSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TDepartment>(defaultDepartmentItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Department setup"
        description="The departments that exist within the school."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-9 gap-2">
          <Label value="Department title" className="col-span-3" />
          <Label value="Code" className="col-span-2" />
          <Label value="Faculty" className="col-span-3" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <DepartmentInputTile
            key={i}
            Department={fieldData}
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

const facultiesFramework: ComboboxFrameworks[] = [
  { label: 'zustandNeeded', value: 'zustandNeeded' },
];

type DepartmentInputTitleProps = {
  Department: TDepartment;
  remove: () => void;
  update: (d: TDepartment) => void;
};
const DepartmentInputTile = ({ Department: department, remove, update }: DepartmentInputTitleProps) => {
  // updates the input of only Department & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      update({ ...department, title: value });
    }
    if (name === "code") {
      update({ ...department, code: value });
    }
  };

  const updateFaculty = (faculty?: string) => {
    update({ ...department, faculty: faculty ?? "" });
  };

  return (
    <div className="grid grid-cols-9 gap-2 ">
      <div className="col-span-3">
        <Input value={department.title} type="text" name="title" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Input value={department.code} type="text" name="code" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-3">
        <Combobox
          frameworks={facultiesFramework}
          defaultSelectedFramework={facultiesFramework.find(
            (framework) => framework.value === department.faculty,
          )}
          onChange={(i) => updateFaculty(facultiesFramework[i]?.value)}
          className="w-full"
        />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

