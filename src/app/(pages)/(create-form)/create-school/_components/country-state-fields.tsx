import { useState } from "react";
import { countries_data } from "scripts/data/countries_data";
import {
  InputErrorMessage,
  LabelAndDescription,
} from "~/components/inputs/input";
import {
  Combobox,
  type ComboboxFrameworks,
} from "~/components/ui/custom/combobox";
import type { TSchoolSchema } from "~/lib/types";


export default function CountryAndStateFields(props: {
  countryErrorMsg?: string;
  stateErrorMsg?: string;
  updateMethod: (k: keyof TSchoolSchema, v: string) => void;
}) {
  // framework: country
  const frameworkCountry: ComboboxFrameworks[] = countries_data.map(
    (country) => ({
      label: country.name,
      value: country.name,
    }),
  );

  // currently selected country states
  const [states, setStates] = useState(countries_data[0]!.states);

  // framework: country
  const frameworkState: ComboboxFrameworks[] = states.map((state) => ({
    label: state.name,
    value: state.name,
  }));

  const selectCountry = (i: number) => {
    props.updateMethod("country", countries_data[i]!.name);
    props.updateMethod("state", "");
    // update states
    setStates(countries_data[i]!.states);
  };

  const selectState = (i: number) => {
    props.updateMethod("state", states[i]?.name ?? "All");
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* country */}
      <div>
        <LabelAndDescription
          label="Country"
          description="The country the school is located at"
        />
        <Combobox
          defaultValue="Select the country"
          frameworks={frameworkCountry}
          onChange={selectCountry}
          className="h-11 w-full rounded"
        />
        {props.countryErrorMsg && (
          <InputErrorMessage value={props.countryErrorMsg} />
        )}
      </div>
      {/* state */}
      <div>
        <LabelAndDescription
          label="State"
          description="The state the school is located at"
        />
        <Combobox
          defaultValue="Select the state"
          frameworks={frameworkState}
          onChange={selectState}
          className="h-11 w-full rounded"
        />
        {props.stateErrorMsg && (
          <InputErrorMessage value={props.stateErrorMsg} />
        )}
      </div>
    </div>
  );
}
