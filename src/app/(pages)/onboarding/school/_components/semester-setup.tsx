import { addDays } from "date-fns";
import { useContext, useState } from "react";
import type { DateRange } from "react-day-picker";
import Divider from "~/components/divider";
import Input from "~/components/inputs/input";
import SemesterAccordion from "~/components/semester-setup-accordion";
import { Accordion } from "~/components/ui/accordion";
import { useToast } from "~/components/ui/use-toast";
import { OnboardingContext } from "~/lib/context";
import { numberPositionPrefix } from "~/lib/utils";
import OnboardingCard from "../../_components/onboarding-card";
import { OnboardingButton, OnboardingTitleAndDescription } from "../../page";
import DegreeSetup from "./degree-setup";

export type TSemester = {
  semesterDuration: DateRange  | undefined;
  breaks: (DateRange|undefined)[];
  exams: DateRange|undefined;
};

const currentDate = new Date();
const [year, month, date] = [
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
];
const defaultSemesterItem: TSemester = {
  semesterDuration: {
    from: new Date(year, month, date),
    to: addDays(new Date(year, month, date), 25),
  },
  breaks: [
    {
      from: addDays(new Date(year, month, date), 10),
      to: addDays(new Date(year, month, date), 17),
    },
  ],
  exams: {
    from: addDays(new Date(year, month, date), 18),
    to: addDays(new Date(year, month, date), 25),
  },
};

export default function SemesterSetup() {
  const { displayNewComponent: displayNextComponent } = useContext(OnboardingContext);
  const nextComponent = <DegreeSetup />;
  // hook allows us increase and reduce the number of semesters
  const {
    fieldsCount,
    updateFieldsCount,
    fieldsDataList: semestersList,
    updateFieldAt: updateSemesterAt
  } = useAddField<TSemester>(defaultSemesterItem);

  const onSubmit = () => {
    // TODO: Ensure the fields are valid before submission
    console.log(semestersList);
    
    displayNextComponent?.bind(null, nextComponent);
  }

  return (
    <>
      <div className="space-y-8 text-center">
        <OnboardingTitleAndDescription
          title="Semester setup"
          description="Start and end date of the semester, breaks, exams."
        />
        <OnboardingCard>
          {/* Semesters per year */}
          <NumberOfSemestersModifier
            count={fieldsCount}
            updateCount={updateFieldsCount}
          />

          <Divider className="my-5" />


          <Accordion type="single" collapsible className="w-full rounded-md">
            {semestersList.map((semester, i) => (
              <SemesterAccordion
                key={i}
                title={numberPositionPrefix(i + 1)}
                isFirst={i === 0}
                isLast={i === semestersList.length - 1}
                semesterData={semester}
                updateSemesterData={(semesterData) => updateSemesterAt(semesterData, i)}
              />
            ))}
          </Accordion>
        </OnboardingCard>
      </div>

      <OnboardingButton
        onClick={onSubmit}
      />
    </>
  );
}

const NumberOfSemestersModifier = ({
  count,
  updateCount,
}: {
  count: number;
  updateCount: (v: number) => void;
}) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-1">
        <p className="font-medium text-cc-content/80">Semesters per year</p>
        <p className="text-cc-content/70">
          The number of academic sessions that hold per year in this school
        </p>
      </div>

      <Input
        value={count}
        type="number"
        name="semesters"
        onChange={(e) => updateCount(parseInt(e.target.value))}
        className="w-20"
      />
    </div>
  );
};

/**
 * This hook uses the {@link fieldsCount} to either increase the size of the 
 * {@link fieldsDataList}, or reduce its size. When the fieldsCount increases by 1, 
 * the the {@link defaultFieldItem} is pushed into {@link fieldsDataList} and when 
 * it reduces by 1 or more, items are popped out of the  {@link fieldsDataList} to 
 * ensure the length of the list and the count stay the same
 * 
 * @param defaultFieldItem This is the default item that is added to the fields data whenever we update the fieldsCount
 * @param defaultFieldsCount The number of fields
 * @returns 
 */
function useAddField<T>(defaultFieldItem: T, defaultFieldsCount = 1) {
  const { toast } = useToast();
  const [fieldsCount, setFieldsCount] = useState(defaultFieldsCount);
  const [fieldsDataList, setFieldsData] = useState<T[]>([defaultFieldItem]);

  // This method updates the fields count and ensures the fields count and the length of the fieldsData stay the same
  const updateFieldsCount = (count: number) => {
    // Ensure count is not less tan 1 or greater than 8
    if (count > 8) {
      toast({ description: "Maximum number fields reached" });
      return setFieldsCount(8);
    }
    if (count < 1) return setFieldsCount(1);
    setFieldsCount(count);

    // add or remove field data record
    if (count < fieldsDataList.length) {
      setFieldsData((prev) => {
        return prev.slice(0, count);
      });
    }
    if (count > fieldsDataList.length) {
      setFieldsData((prev) => {
        return [...prev, defaultFieldItem];
      });
    }
  };

  const updateFieldAt = (data: T, i: number) => {
    const newData = [ ...fieldsDataList ]
    newData[i] = data;
    setFieldsData(newData);
  }

  return { fieldsCount, updateFieldsCount, fieldsDataList, updateFieldAt };
}
