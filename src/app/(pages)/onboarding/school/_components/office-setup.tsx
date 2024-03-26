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
import BuildingSetup from "./building-setup";

const defaultOfficeItem = { title: "", acronym: "", sector: "" };
type TOffice = typeof defaultOfficeItem;

export default function OfficeSetup() {
  const { displayNewComponent: displayNextComponent } =
    useContext(OnboardingContext);
  const nextComponent = <BuildingSetup />;

  const { fieldsList, addNewField, removeFieldAt, updateFieldAt } =
    useManageFields<TOffice>(defaultOfficeItem);

  const onSubmit = () => {
    console.log(fieldsList);
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Office setup"
        description="The different office positions in the school."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[37rem]">
        <div className="grid grid-cols-9 gap-2">
          <Label value="Office title" className="col-span-3" />
          <Label value="Acronym" className="col-span-2" />
          <Label value="Sector" className="col-span-3" />
        </div>
        {fieldsList.map((fieldData, i) => (
          <OfficeInputTile
            key={i}
            Office={fieldData}
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

type OfficeInputTileProps = {
  Office: TOffice;
  remove: () => void;
  update: (d: TOffice) => void;
};
const OfficeInputTile = ({ Office: office, remove, update }: OfficeInputTileProps) => {
  // updates the input of only Office & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      update({ ...office, title: value });
    }
    if (name === "acronym") {
      update({ ...office, acronym: value });
    }
  };

  const updateOfficeSector = (sector?: string) => {
    update({ ...office, sector: sector ?? "" });
  };

  return (
    <div className="grid grid-cols-9 gap-2 ">
      <div className="col-span-3">
        <Input value={office.title} type="text" name="title" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-2">
        <Input value={office.acronym} type="text" name="acronym" className="w-full" onChange={onChange} />
      </div>
      <div className="col-span-3">
        <Combobox
          frameworks={facultiesFramework}
          defaultSelectedFramework={facultiesFramework.find(
            (framework) => framework.value === office.sector,
          )}
          onChange={(i) => updateOfficeSector(facultiesFramework[i]?.value)}
          className="w-full"
        />
      </div>
      <div className="col-span-1">
        <RemoveButton onClick={remove} />
      </div>
    </div>
  );
};

