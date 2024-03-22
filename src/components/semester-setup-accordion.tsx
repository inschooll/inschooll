import type { DateRange } from "react-day-picker";
import type { TSemester } from "~/app/(pages)/onboarding/school/_components/semester-setup";
import { LabelAndDescription } from "~/components/inputs/input";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";
import { AddButton, RemoveButton } from "./buttons/composite-buttons";
import Divider from "./divider";
import DatePickerWithRange from "./ui/custom/date-picker-with-range";

type Props = {
  title: string;
  isFirst: boolean;
  isLast: boolean;
  semesterData: TSemester;
  updateSemesterData: (semesterData: TSemester) => void;
};

export default function SemesterAccordion({
  title,
  isFirst,
  isLast,
  semesterData,
  updateSemesterData,
}: Props) {
  // update the semester duration - when it starts and ends
  const updateSemesterDuration = (dateRange?: DateRange) => {
    const newSemesterData = { ...semesterData };
    newSemesterData.semesterDuration = dateRange;
    updateSemesterData(newSemesterData);
  };

  // update the list of breaks in the semester - it could be 0, 1 or more breaks
  const updateSemesterBreaksList = (dateRangeList: (DateRange | undefined)[]) => {
    console.log("updateList");
    const newSemesterData = { ...semesterData };
    newSemesterData.breaks = dateRangeList;
    updateSemesterData(newSemesterData);
  };

  // update when the semester exams would start and end
  const updateExamDuration = (dateRange?: DateRange) => {
    const newSemesterData = { ...semesterData };
    newSemesterData.exams = dateRange;
    updateSemesterData(newSemesterData);
  };

  return (
    <AccordionItem value={title}>
      <AccordionTrigger
        className={cn(
          "md:h-13 h-12 border border-cc-border bg-secondary px-5",
          {
            "rounded-t-md": isFirst,
            "rounded-b-md": isLast,
          },
        )}
      >
        <p>{title} Semester</p>
      </AccordionTrigger>
      <AccordionContent
        className={cn("border-x border-cc-border p-5", {
          "rounded-b-lg border-b": isLast,
        })}
      >
        {/* Semester duration sections */}
        <>
          <LabelAndDescription
            label="Semester duration"
            description="When the semester starts and ends."
          />
          <DatePickerWithRange
            updateDate={updateSemesterDuration}
            defaultDateRange={semesterData.semesterDuration}
          />
        </>

        <Divider className="my-5" />

        {/* Breaks section */}
        <>
          <LabelAndDescription
            label="In semester breaks"
            description="Breaks that take place during the semester."
          />
          <SemesterBreaksList
            dateRangeList={semesterData.breaks}
            updateList={updateSemesterBreaksList}
          />
        </>

        <Divider className="my-5" />

        {/* Exams section */}
        <>
          <LabelAndDescription
            label="Exams duration"
            description="When the semester exam starts and ends."
          />
          <DatePickerWithRange
            updateDate={updateExamDuration}
            defaultDateRange={semesterData.exams}
          />
        </>
      </AccordionContent>
    </AccordionItem>
  );
}

type SemesterBreakProps = {
  dateRangeList: (DateRange | undefined)[];
  updateList: (list: (DateRange | undefined)[]) => void;
};

const SemesterBreaksList = ({ dateRangeList, updateList }: SemesterBreakProps) => {
  const addNewField = () => {
    updateList([...dateRangeList, undefined]);
  };

  const removeFieldAt = (i: number) => {
    const updatedFields = dateRangeList.filter((_, index) => index !== i);
    updateList(updatedFields);
    console.log({updatedFields});
  };

  const updateAt = (i: number, dateRange?: DateRange) => {
    const newSemesterBreaks = [...dateRangeList];
    newSemesterBreaks[i] = dateRange;
    updateList(newSemesterBreaks);
  };

  return (
    <>
      <div className="space-y-2">
        {dateRangeList.map((brk, i) => (
          <SemesterBreakItem
            key={i}
            dateRange={brk}
            onChange={(dateRange) => updateAt(i, dateRange)}
            onRemoveClick={() => removeFieldAt(i)}
          />
        ))}
      </div>
      <AddButton className="mt-3" title="Add another" onClick={addNewField} />
    </>
  );
};

function SemesterBreakItem(props: {
  dateRange?: DateRange;
  onChange: (dateRange?: DateRange) => void;
  onRemoveClick: () => void;
}) {
  console.log({dateRange: props.dateRange});

  return (
    <div className="flex gap-2">
      <DatePickerWithRange
        updateDate={props.onChange}
        defaultDateRange={props.dateRange}
      />

      <RemoveButton onClick={props.onRemoveClick} />
    </div>
  );
}
