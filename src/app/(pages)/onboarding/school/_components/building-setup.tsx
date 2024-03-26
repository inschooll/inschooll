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
import GradingSystemSetup from "./grading-system-setup";

const defaultBuildingItem = { title: "", type: "" };
type TBuilding = typeof defaultBuildingItem;

export default function BuildingSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <GradingSystemSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TBuilding>(defaultBuildingItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Building setup"
        description="The physical buildings that exist in the school."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-8 gap-2">
          <Label value="Building title" className="col-span-4" />
          <Label value="Type" className="col-span-3" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <BuildingInputTile
            key={i}
            Building={fieldData}
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

type BuildingInputTileProps = {
  Building: TBuilding;
  remove: () => void;
  update: (d: TBuilding) => void;
};
const BuildingInputTile = ({ Building: Building, remove, update }: BuildingInputTileProps) => {
  // updates the input of only Building & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    update({ ...Building, title: value });
  };

  const updateBuildingType = (sector?: string) => {
    update({ ...Building, type: sector ?? "" });
  };

  return (
    <div className="grid grid-cols-8 gap-2 ">
      <div className="col-span-4">
        <Input value={Building.title} type="text" name="title" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-3">
        <Combobox
          frameworks={facultiesFramework}
          defaultSelectedFramework={facultiesFramework.find(
            (framework) => framework.value === Building.type,
          )}
          onChange={(i) => updateBuildingType(facultiesFramework[i]?.value)}
          className="w-full"
        />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

