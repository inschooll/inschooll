"use client";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import DropdownButton from "~/components/inputs/dropdown-button";
import Input, { LabelAndDescription } from "~/components/inputs/input";
import {
  Accordion
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { SectionTitle } from "./_components/section-title";
import SemesterAccordion from "~/components/semester-setup-accordion";
import { numberPositionPrefix } from "~/lib/utils";

export default function Page() {
  return (
    <div>
      <RandomSection />

      <SemesterSection />
      
      <SupportedDegreeSection />
    </div>
  );
}

export const RandomSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="General" variant="lg" />
      {/* Name */}
      <div className="flex items-end gap-2">
        <Input label="School name" />
        <Button variant={"secondary"}>Rename</Button>
      </div>

      {/* Currency */}
      <div>
        <LabelAndDescription
          label="Currency"
          description="This is the payment currency that will be supported by this university"
        />
        <div className="flex items-end gap-2">
          <DropdownButton
            name="Currency"
            options={[]}
            updateSelected={(index) => console.log("picked", index)}
          />
          <Button variant={"secondary"}>Change</Button>
        </div>
      </div>

      {/* University Type - Private or public or what */}
      <div>
        <LabelAndDescription
          label="University / College type"
          description="This is the payment currency that will be supported by this university"
        />
        <div className="flex items-end gap-2">
          <DropdownButton
            name="Type of university"
            options={[]}
            updateSelected={(index) => console.log("picked", index)}
          />
          <Button variant={"secondary"}>Change</Button>
        </div>
      </div>

      {/* Enable faculty dues */}
      <div className="flex gap-2">
        <Input type="checkbox" className="mt-2" />
        <LabelAndDescription
          label="Enable faculty dues"
          description="Enable faculties to be able to request faculty dues from students. This would be added to the total school fees"
        />
      </div>
    </div>
  );
};

export const SemesterSection = () => {
  const [semestersCount, setSemestersCount] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Semester" className="mt-5" />

      {/* Semesters per year */}
      <div>
        <LabelAndDescription
          label="Semesters per year"
          description="This is the amount of academic quatres that holds each year at this school"
        />
        <div className="flex items-end gap-2">
          <Input
            type="number"
            className="w-20"
            onChange={(e) => {
              console.log("changed", e.target.value);
              const newValue = parseInt(e.target.value);
              if (newValue > 0) setSemestersCount(newValue ?? 1);
              else setSemestersCount(1);
            }}
          />
          <Button variant={"secondary"}>Save</Button>
        </div>
      </div>

      {/* Nth Semester */}
      <Accordion type="single" collapsible className="w-full rounded-md">
        {Array(semestersCount)
          .fill("")
          .map((_, index) => (
            <SemesterAccordion
              title={numberPositionPrefix(index+1)}
              isFirst={index === 0}
              isLast={index === semestersCount - 1}
              key={index + 1}
            />
          ))}
      </Accordion>
    </div>
  );
};



const SupportedDegreeSection = () => {
  return (
    <div className="mt-3 flex flex-col gap-5">
      <SectionTitle
        title="Supported Degrees"
        description="School degree is a qualification awarded to a student upon successful completion of a course of study in higher education"
        className="mt-5"
      />
      {/* Search <-> Add degree and co */}
      <div className="mt-1 flex justify-between">
        <Input />

        <div className="flex gap-2">
          <Button variant={"secondary"}>
            <LuTrash2 />
            <p className="hidden pl-2 md:block">Delete</p>
          </Button>

          <Button variant={"tertiary"}>
            <IoMdAdd size={20} />
            <p className="pl-2 md:hidden">Add</p>
            <p className="hidden pl-2 md:block">Add degree type</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
