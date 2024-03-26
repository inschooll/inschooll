"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import Input, { LabelAndDescription } from "~/components/inputs/input";
import { T5 } from "~/components/texts/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import SelectCombo, { type SelectComboFrameworksProps } from "~/components/ui/custom/select-combo";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn, getLevelTitle, numberPositionPrefix } from "~/lib/utils";
import { useSemesterContext } from "../page";

const degreeOptions: SelectComboFrameworksProps = [
  {value: '1', label: "Associate degree"},
  {value: '2', label: "Bachelors degree"},
  {value: '3', label: "Masters degree"},
  {value: '4', label: "Doctorate degree"},
];

export default function AddProgrammeDialog() {
  const [enrollmentOptions, setEnrollmentOptions] = useState([
    { value: 1, isSelected: false },
    { value: 2, isSelected: false },
    { value: 3, isSelected: false },
    { value: 4, isSelected: true },
    { value: 5, isSelected: false },
    { value: 6, isSelected: false },
    { value: 7, isSelected: false },
    { value: 8, isSelected: false },
  ]);

  const updateSelectedYear = (i: number) => {
    const newValue = {
      value: enrollmentOptions[i]!.value,
      isSelected: !enrollmentOptions[i]?.isSelected,
    };
    enrollmentOptions[i] = newValue;

    // update selected enrollment options
    setEnrollmentOptions([...enrollmentOptions]);
  };

  return (
    <>
      <div className="border-b border-border px-3 py-3 md:px-6">
        <T5>Add Programme</T5>
      </div>
      <ScrollArea>
        <div className="flex h-screen flex-col gap-5 px-3 py-5 md:px-6">
          {/* Degree type */}
          <div>
            <LabelAndDescription
              label="Degree type"
              description="The qualification awarded to a student upon successful completion of the programme"
            />
            <SelectCombo defaultValue="Select a degree ..." frameworks={degreeOptions} />
          </div>

          {/*  Total credits */}
          <Input
            label="Total credits"
            name="totalCredits"
            description="The total credits for this programme"
            type="number"
            className="w-20"
          />

          {/* Years of enrollment options */}
          <div>
            <LabelAndDescription
              label="Years of enrollment options"
              description="The different years enrollment options students can uniquely enroll in for this particular programme"
            />
            <div className="flex flex-wrap gap-2">
              {enrollmentOptions.map((item, i) => (
                <Badge
                  key={item.value}
                  value={`${item.value} ${item.value === 1 ? "year" : "years"}`}
                  isSelected={item.isSelected}
                  setSelectedYear={() => updateSelectedYear(i)}
                />
              ))}
            </div>
          </div>

          {/* Enrollment Options settings */}
          <div className="">
            {/* Enrollment Section */}
            <div className="rounded-lg border border-border">
              <Accordion
                type="single"
                collapsible
                className="w-full rounded-md"
              >
                {enrollmentOptions.map((item, index) => {
                  if (item.isSelected === false) return <></>;

                  return (
                    <EnrollmentAccordion
                      key={index}
                      value={`${item.value} ${item.value === 1 ? "year" : "years"}`}
                      levelsCount={item.value}
                      isFirst={index === 0}
                      isLast={index === enrollmentOptions.length - 1}
                    />
                  );
                })}
              </Accordion>
            </div>
            {/* Body */}
          </div>
        </div>
      </ScrollArea>
      <div className="border-t border-border px-3 py-3 md:px-6">
        <div className="flex justify-end">
          <Button className={"w-full md:w-28"}>Add</Button>
        </div>
      </div>
    </>
  );
}

const EnrollmentAccordion = ({
  value,
  levelsCount,
  isFirst,
  isLast,
}: {
  value: string;
  levelsCount: number;
  isFirst: boolean;
  isLast: boolean;
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger
        className={cn("border-b border-border px-5", {
          "rounded-t-md": isFirst,
          "rounded-b-md": !isFirst && isLast,
        })}
      >
        <p>{value}</p>
      </AccordionTrigger>
      <AccordionContent className="p-3">
        {/* LevelAccordion */}
        <Accordion type="single" collapsible className="w-full rounded-md">
          {Array(levelsCount)
            .fill("a")
            .map((value, index) => (
              <LevelAccordion
                key={index}
                level={getLevelTitle(index + 1)}
                isFirst={index === 0}
                isLast={index === levelsCount - 1}
              />
            ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

const LevelAccordion = ({
  level,
  isFirst,
  isLast,
}: {
  level: string;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const context = useSemesterContext();

  return (
    <AccordionItem value={level}>
      <AccordionTrigger
        className={cn(
          "h-12 border border-cc-border bg-secondary px-5 md:h-14",
          {
            "rounded-t-md": isFirst,
            "rounded-b-md": !isFirst && isLast,
          },
        )}
      >
        <p>{level}</p>
      </AccordionTrigger>
      <AccordionContent
        className={cn("border-x border-cc-border px-5 py-4", {
          "rounded-b-lg border-b": isLast,
        })}
      >
        <div className="flex flex-col gap-5">
          {/*  Tuition */}
          <Input
            label="Tuition"
            description="The programme fees paid for the particular enrollment year"
            type="text"
          />
          {/*  Total level credit unit */}
          <Input
            label="Total level credit units"
            description="The total credit units for this particular level"
            type="number"
            className="w-20"
          />
          
          {/* Semesters */}
          <div className="border border-border rounded-lg">
            {Array(context.semesterCount)
              .fill("_")
              .map((_, index) => (
                <Semester key={index} value={`${numberPositionPrefix(index+1)} semester`} showContent={index === 0} />
              ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const Semester = ({ value, showContent = false }: { value: string, showContent?: boolean }) => {
  const [show, setShow] = useState(showContent);
  return (
    <div className="flex flex-col gap-5">

      {/* Title */}
      <div
        className="flex cursor-pointer items-center justify-between px-3 md:px-5 border-b border-border py-4"
        onClick={() => setShow(!show)}
      >
        <p className="font-medium">{value}</p>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </div>

      {show && (
        <div className="flex flex-col gap-5 px-3 md:px-5 pb-5">
          <div className="flex items-center gap-3 md:gap-8">
            <Input
              label="Total semester credit units"
              description="This is the total credit unit for a semester"
              type="number"
              className="w-20"
            />
          </div>

          {/* Search <-> Add degree and co */}
          <div className="mt-1 flex justify-between">
            <Input placeholder="Search" />

            <div className="flex gap-2">
              <Button variant={"secondary"} type="button">
                <LuTrash2 />
                <p className="hidden pl-2 md:block">Delete</p>
              </Button>
            </div>
          </div>

          {/* TODO: ADD TABLE */}
          <h1>#ADD TABLE</h1>
        </div>
      )}
    </div>
  );
};

const Badge = (props: {
  value: string;
  isSelected: boolean;
  setSelectedYear: () => void;
}) => {
  return (
    <span
      className={cn(
        "shrink-0 cursor-pointer rounded-md border border-border px-2 py-0.5",
        {"border-primary text-primary": props.isSelected},
      )}
      onClick={props.setSelectedYear}
    >
      {props.value}
    </span>
  );
};
