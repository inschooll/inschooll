import {
  InputErrorMessage,
  LabelAndDescription,
} from "~/components/inputs/input";
import {
  Combobox,
  type ComboboxFrameworks,
} from "~/components/ui/custom/combobox";
import DatePicker from "~/components/ui/custom/DatePicker";
import constants from "~/lib/constants/constants";

type CompProps = {
  educationLevelErrorMsg?: string;
  schoolTypeErrorMsg?: string;
  establishmentDateErrorMsg?: string;
  updateMethod: (k: string, v: string) => void;
};

export default function EducationLevel_SchoolType_EstablishmentDate(props: CompProps) {
  const frameworkEducationLevel: ComboboxFrameworks[] =
    constants.educationLevels.map((level) => ({ label: level, value: level }));
  const frameworkSchoolType: ComboboxFrameworks[] =
    constants.schoolTypes.map((type) => ({ label: type, value: type }));

  const selectEducationLevel = (i: number) => {
    const educationLevel = constants.educationLevels[i];
    console.log({ educationLevel });
  };

  const selectSchoolType = (i: number) => {
    const schoolType = constants.schoolTypes[i];
    console.log({ schoolType });
  };

  const selectEstablishmentDate = (date: Date) => {
    console.log({ date });
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="flex-1">
        <LabelAndDescription
          label="Education Level"
          description="The level of education of the school"
        />
        <Combobox
          defaultValue="Select the schools level"
          frameworks={frameworkEducationLevel}
          onChange={selectEducationLevel}
          className="h-11 w-full rounded"
        />
        {props.educationLevelErrorMsg && (
          <InputErrorMessage value={props.educationLevelErrorMsg} />
        )}
      </div>
      <div className="flex-1">
        <LabelAndDescription label="School type" description="The type of school" />
        <Combobox
          defaultValue="Select the school type"
          frameworks={frameworkSchoolType}
          onChange={selectSchoolType}
          className="h-11 w-full rounded"
        />
        {props.educationLevelErrorMsg && (
          <InputErrorMessage value={props.educationLevelErrorMsg} />
        )}
      </div>
      <div className="flex-1">
        <LabelAndDescription
          label="Establishment date"
          description="When the school was established"
        />

        <DatePicker
          className="h-11 rounded"
          updateDate={selectEstablishmentDate}
        />
        {props.educationLevelErrorMsg && (
          <InputErrorMessage value={props.educationLevelErrorMsg} />
        )}
      </div>
    </div>
  );
}
