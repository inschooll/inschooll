import { type ChangeEvent, useContext, useState } from "react";
import {
  AddButton,
  RemoveButton,
} from "~/components/buttons/composite-buttons";
import Input from "~/components/inputs/input";
import Label from "~/components/inputs/label";
import QuickNavbar from "~/components/navbar/quick-navbar";
import { T6 } from "~/components/texts/title";
import {
  Combobox,
  type ComboboxFrameworks,
} from "~/components/ui/custom/combobox";
import { useToast } from "~/components/ui/use-toast";
import { OnboardingContext } from "~/lib/context";
import { useManageFields } from "~/lib/hooks";
import { generateIdPattern } from "~/lib/utils";
import OnboardingCard from "../../_components/onboarding-card";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import Summary from "./summary";

// This are the allowed dropdown types
type TSegmentTypes =
  | ""
  | "fixed"
  | "acronym"
  | "year"
  | "code"
  | "unique number"
  | "alphanumeric"
  | "alphabets"
  | "numbers";

type TAcronymOf = "" | "programme" | "school name";
type TYearOf = "" | "admission" | "employment";
type TCodeOf = "" | "department" | "school name";
type TCodeBasedOn = "" | "staff" | "student";
type TCodeBasedOnIn = "" | "department" | "faculty";
type TYearOfShouldInclude = "" | "All digits" | "Last 2 digits";

// Our segment type
export type TSegment = {
  type: TSegmentTypes;
  fixedValue: string;
  acronymOf: TAcronymOf;
  yearOf: TYearOf;
  shouldInclude: TYearOfShouldInclude;
  codeOf: TCodeOf;
  basedOn: TCodeBasedOn;
  in: TCodeBasedOnIn;
  minLength: number;
  maxLength: number;
  specialCharacters: string;
};
type TSegmentKeys = keyof TSegment;

const defaultSegmentItem: TSegment = {
  type: "",
  fixedValue: "",
  acronymOf: "",
  yearOf: "",
  codeOf: "",
  basedOn: "",
  in: "",
  shouldInclude: "All digits",
  specialCharacters: "",
  minLength: 0,
  maxLength: 5,
};

/**
 * This section describes the id number used for the students and the staff.
 * It makes use segments to describe the different portions of an id number
 * @returns 
 */
export default function IDNumberSetup() {
  // navigation to the next component tools
  const { displayNewComponent: displayNextComponent } = 
    useContext(OnboardingContext);
  const nextComponent = <Summary />;

  // student and id fields managers
  const {
    fieldsList: studentFieldsList,
    addNewField: addNewStudentField,
    removeFieldAt: removeStudentFieldAt,
    updateFieldAt: updateStudentFieldAt,
  } = useManageFields<TSegment>(defaultSegmentItem, 20);
  const {
    fieldsList: staffFieldsList,
    addNewField: addNewStaffField,
    removeFieldAt: removeStaffFieldAt,
    updateFieldAt: updateStaffFieldAt,
  } = useManageFields<TSegment>(defaultSegmentItem, 20);

  // tab selection state
  const [selectedTab, setSelectedTab] = useState<"student-id" | "staff-id">(
    "student-id",
  );

  // submission
  const onSubmit = () => {
    console.log('SUBMIT: 🦆')
    console.log('SEGMENTS:')
    console.log({ studentFieldsList, staffFieldsList });
    
    const studentIdPattern = generateIdPattern(studentFieldsList);
    const staffIdPattern = generateIdPattern(staffFieldsList);
    
    console.log('PATTERNS:')
    console.log({ studentIdPattern, staffIdPattern })
    displayNextComponent && displayNextComponent(nextComponent);
  };

  return (
    <>
      <OnboardingTitleAndDescription
        title="Identification number setup"
        description="This are unique identifiers for members of the school."
      />
      <OnboardingCard className="w-full space-y-3 md:w-[44rem] lg:w-[50rem]">
        <div>
          <T6>Id number pattern</T6>
          <p className="text-cc-content/70">
            Setup the pattern for the student Id number and the staff Id number.
          </p>
        </div>

        <QuickNavbar
          tabsData={[
            {
              title: "Student ID",
              isSelected: selectedTab === "student-id",
              onClick: () => setSelectedTab("student-id"),
            },
            {
              title: "Staff ID",
              isSelected: selectedTab === "staff-id",
              onClick: () => setSelectedTab("staff-id"),
            },
          ]}
        />

        <div className="py">
          <p className="text-cc-content/70">
            Id numbers are made up of <b>segments</b>, segments combine together
            to form id numbers. Down below you can add different segments, each
            segment specifies a pattern in the id number.
          </p>
        </div>

        <div className="space-y-3 divide-y divide-cc-border pt-3 sm:divide-y-0">
          {selectedTab === "student-id" && (
            <>
              {studentFieldsList.map((fieldData, i) => (
                <SegmentTile
                  key={i}
                  segment={fieldData}
                  remove={() => removeStudentFieldAt(i)}
                  update={(field) => updateStudentFieldAt(field, i)}
                />
              ))}
              <AddButton title="Add segment" onClick={addNewStudentField} />
            </>
          )}

          {selectedTab === "staff-id" && (
            <>
              {staffFieldsList.map((fieldData, i) => (
                <SegmentTile
                  key={i}
                  segment={fieldData}
                  remove={() => removeStaffFieldAt(i)}
                  update={(field) => updateStaffFieldAt(field, i)}
                />
              ))}
              <AddButton title="Add segment" onClick={addNewStaffField} />
            </>
          )}
        </div>
      </OnboardingCard>

      <OnboardingButton onClick={onSubmit} />
    </>
  );
}

const typeFramework: ComboboxFrameworks[] = [
  { label: "Fixed", value: "fixed" },
  { label: "Acronym", value: "acronym" },
  { label: "Alphabets", value: "alphabets" },
  { label: "Alphanumeric", value: "alphanumeric" },
  { label: "Code", value: "code" },
  { label: "Numbers", value: "numbers" },
  { label: "Unique number", value: "unique number" },
  { label: "Year", value: "year" },
];

// for acronym type
const acronymOfFramework: ComboboxFrameworks[] = [
  { label: "Programme", value: "programme" },
  { label: "School name", value: "school name" },
];
// for year type
const yearOfFramework: ComboboxFrameworks[] = [
  { label: "Admission", value: "admission" },
  { label: "Employment", value: "employment" },
];
const shouldIncludeFramework: ComboboxFrameworks[] = [
  { label: "All digits", value: "all digits" },
  { label: "Last 2 digits", value: "last 2 digits" },
];
// for code type
const codeOfFramework: ComboboxFrameworks[] = [
  { label: "Department", value: "department" },
  { label: "Faculty", value: "faculty" },
];
// for unique number type
const basedOnFramework: ComboboxFrameworks[] = [
  { label: "Student", value: "student" },
  { label: "Staff", value: "staff" },
];
const inFramework: ComboboxFrameworks[] = [
  { label: "Department", value: "department" },
  { label: "Faculty", value: "faculty" },
  { label: "School", value: "school" },
];

type IDInputTileProps = {
  segment: TSegment;
  remove: () => void;
  update: (d: TSegment) => void;
};

/**
 * This is a series of input and dopdown fields that takes in the
 * description of a segment - a segment is a pattern matcher
 * that describes a portion of the id number, it d
 * @param param0
 * @returns
 */
const SegmentTile = ({ segment, remove, update }: IDInputTileProps) => {
  const { toast } = useToast();
  // updates the input of only ID & acronym
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    // if value is a number ensure it isn't less than 0
    if (parseInt(value) && parseInt(value) < 0) return;
    // ensure value doesn't contain any of the special characters
    // const regex = /[!@#$%^&*()_+\-=\[\]\{};':"\\|,.<>\/?]+/;
    const regex = /[()\[\]\{}<>]+/;
    if (regex.test(value)) return toast({ description: `"${value[value.length-1]}" is not a supported character` });

    update({ ...segment, [name]: value });
  };

  const updateSegment = (key: TSegmentKeys, segType = "") => {
    const sType: TSegmentTypes = segType ? (segType as TSegmentTypes) : "";
    console.log(sType);
    update({ ...segment, [key]: sType });
  };

  return (
    <>
      <div className="flex flex-wrap items-end gap-2 pt-2 sm:flex-nowrap sm:pt-0">
        {/* Type  */}
        <LabelWrapper label="Type">
          <Combobox
            frameworks={typeFramework}
            defaultSelectedFramework={typeFramework.find(
              (framework) => framework.value === segment.type,
            )}
            onChange={(i) => updateSegment("type", typeFramework[i]?.value)}
            className="w-[150px] rounded-sm"
            disableSearch={true}
          />
        </LabelWrapper>

        {/* Type - Fixed -> Fixed value */}
        {segment.type === "fixed" && (
          <LabelWrapper label="Fixed value">
            <Input
              type="text"
              value={segment.fixedValue}
              name="fixedValue"
              className="w-[150px]"
              onChange={onChange}
            />
          </LabelWrapper>
        )}

        {/* Type - Acronym -> Acronym of */}
        {segment.type === "acronym" && (
          <LabelWrapper label="Acronym of">
            <Combobox
              frameworks={acronymOfFramework}
              defaultSelectedFramework={acronymOfFramework.find(
                (framework) => framework.value === segment.acronymOf,
              )}
              onChange={(i) =>
                updateSegment("acronymOf", acronymOfFramework[i]?.value)
              }
              className="w-[150px] rounded-sm"
              disableSearch={true}
            />
          </LabelWrapper>
        )}

        {/* Type - Year -> Year of */}
        {segment.type === "year" && (
          <>
            <LabelWrapper label="Year of">
              <Combobox
                frameworks={yearOfFramework}
                defaultSelectedFramework={yearOfFramework.find(
                  (framework) => framework.value === segment.yearOf,
                )}
                onChange={(i) =>
                  updateSegment("yearOf", yearOfFramework[i]?.value)
                }
                className="w-[150px] rounded-sm"
                disableSearch={true}
              />
            </LabelWrapper>
            <LabelWrapper label="Should include">
              <Combobox
                frameworks={shouldIncludeFramework}
                defaultSelectedFramework={shouldIncludeFramework.find(
                  (framework) => framework.value === segment.shouldInclude,
                )}
                onChange={(i) =>
                  updateSegment("shouldInclude", shouldIncludeFramework[i]?.value)
                }
                className="w-[150px] rounded-sm"
                disableSearch={true}
              />
            </LabelWrapper>
          </>
        )}

        {/* Type - Code -> Code of */}
        {segment.type === "code" && (
          <LabelWrapper label="Code of">
            <Combobox
              frameworks={codeOfFramework}
              defaultSelectedFramework={codeOfFramework.find(
                (framework) => framework.value === segment.codeOf,
              )}
              onChange={(i) => updateSegment("codeOf", codeOfFramework[i]?.value)}
              className="w-[150px] rounded-sm"
              disableSearch={true}
            />
          </LabelWrapper>
        )}

        {/* Type - Unique number -> Based on */}
        {segment.type === "unique number" && (
          <>
            <LabelWrapper label="Based on">
              <Combobox
                frameworks={basedOnFramework}
                defaultSelectedFramework={basedOnFramework.find(
                  (framework) => framework.value === segment.basedOn,
                )}
                onChange={(i) =>
                  updateSegment("basedOn", basedOnFramework[i]?.value)
                }
                className="w-[150px] rounded-sm"
                disableSearch={true}
              />
            </LabelWrapper>

            {/*  */}
            <LabelWrapper label="In">
              <Combobox
                frameworks={inFramework}
                defaultSelectedFramework={inFramework.find(
                  (framework) => framework.value === segment.in,
                )}
                onChange={(i) => updateSegment("in", inFramework[i]?.value)}
                className="w-[150px] rounded-sm"
                disableSearch={true}
              />
            </LabelWrapper>
          </>
        )}

        {/* Type - [alphabets | alphanumeric | numbers] */}
        {(segment.type === "alphabets" ||
          segment.type === "alphanumeric" ||
          segment.type === "numbers") && (
          <>
            {/* Min Length */}
            <LabelWrapper label="Min length">
              <Input
                type="number"
                value={segment.minLength}
                name={"minLength" as TSegmentKeys}
                className="w-[80px]"
                onChange={onChange}
              />
            </LabelWrapper>
            {/* Max Length */}
            <LabelWrapper label="Max length">
              <Input
                type="number"
                value={segment.maxLength}
                name={"maxLength" satisfies TSegmentKeys}
                className="w-[80px]"
                onChange={onChange}
              />
            </LabelWrapper>
            {/* Special characters */}
            <LabelWrapper label="Special characters">
              <Input
                type="text"
                value={segment.specialCharacters}
                name={"specialCharacters" satisfies TSegmentKeys}
                className="w-full md:w-[150px]"
                onChange={onChange}
              />
            </LabelWrapper>
          </>
        )}
        <div className="shrink-0">
          <RemoveButton onClick={remove} />
        </div>
      </div>
    </>
  );
};

/**
 * Renders a label wrapper component right above the child.
 *
 * @return {JSX.Element} The label wrapper component.
 */
const LabelWrapper = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2">
      <Label value={label} className="block text-cc-content/50" />
      {children}
    </div>
  );
};
