"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useState } from "react";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { LuTrash2 } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import Input, { LabelAndDescription } from "~/components/inputs/input";
import TextareaField from "~/components/inputs/textarea_field";
import { Button } from "~/components/ui/button";
import {
  Combobox,
  type ComboboxFrameworks,
} from "~/components/ui/custom/combobox";
import SelectCombo, {
  type SelectComboFrameworksProps,
} from "~/components/ui/custom/select-combo";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { DepartmentSchema, type TDepartmentSchema } from "~/lib/types";
import { SectionTitle } from "../../_components/section-title";
import GradingSection from "./_component/grading-section";
import AddModuleDialog from "./_component/modules-dialog";

type TSemester = {
  semesterCount: number;
};

export const SemesterContext = createContext<TSemester | null>(null);

export const useSemesterContext = () => {
  const context = useContext(SemesterContext);
  if (context === null)
    throw new Error(
      "useSemesterContext must be used within a SemesterContext provider",
    );

  return context;
};

export default function Page() {
  const methods = useForm<TDepartmentSchema>({
    resolver: zodResolver(DepartmentSchema),
  });

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <SemesterContext.Provider value={{ semesterCount: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            {/* Section 1 */}
            <MainSection methods={methods} />

            {/* Section 2 */}
            <GradingSection />

            {/* Section 3 */}
            <ModulesSection />

            {/* Create */}
            <div className="mt-5">
              <Button variant={"default"} size={"lg"} className="w-full">
                Create
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </SemesterContext.Provider>
  );
}

const MainSection = ({
  methods,
}: {
  methods: UseFormReturn<TDepartmentSchema>;
}) => {
  const [belongsToADepartment, setBelongsToADepartment] = useState(false);
  const [isAccredited, setIsAccredited] = useState(false);
  const departments: ComboboxFrameworks[] = [
    { label: "Computer Science", value: "1" },
    { label: "Cyber Security", value: "2" },
  ];
  const levels: SelectComboFrameworksProps = [
    { label: "100 level", value: "1" },
    { label: "200 level", value: "2" },
    { label: "300 level", value: "3" },
    { label: "400 level", value: "4" },
  ];
  const semesters: SelectComboFrameworksProps = [
    { label: "first", value: "1" },
    { label: "second", value: "2" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Add course" variant="lg" />
      {/* Name */}
      <Input
        label="Course title"
        name="title"
        description="The title of the course e.g Introduction to Chemistry"
        type="text"
      />

      {/* Code */}
      <Input
        label="Course code"
        description="The course code is a unique identifier used for identifying a course"
        name="code"
        type="text"
      />

      {/* Belongs to a Department */}
      <div className="flex gap-2">
        <Input
          type="checkbox"
          className="mt-2"
          onChange={(e) => setBelongsToADepartment(e.target.checked)}
        />
        <div>
          <LabelAndDescription
            label="This course belongs to a particular department"
            description="Even though a course belongs to a particular department, it can still be taken by other departments except that option is disabled"
          />
          {belongsToADepartment && (
            <Combobox
              defaultValue="Select a department..."
              frameworks={departments}
            />
          )}
        </div>
      </div>

      {/* Has a default lecturer */}
      <div className="flex gap-2">
        <Input
          type="checkbox"
          className="mt-2"
          onChange={(e) => setBelongsToADepartment(e.target.checked)}
        />
        <div>
          <LabelAndDescription
            label="This course belongs to a particular department"
            description="Even though a course belongs to a particular department, it can still be taken by other departments except that option is disabled"
          />
          {belongsToADepartment && (
            <Combobox
              defaultValue="Select a department..."
              frameworks={departments}
            />
          )}
        </div>
      </div>

      {/*  Level */}
      <div>
        <LabelAndDescription
          label="Level"
          description="The level that this course belongs to"
        />
        <SelectCombo defaultValue="Select a level" frameworks={levels}  />
      </div>

      {/*  Semester */}
      <div>
        <LabelAndDescription
          label="Semester"
          description="The semester that this course belongs to"
        />
        <SelectCombo defaultValue="Select a level" frameworks={semesters} />
      </div>

      {/* Description */}
      <TextareaField
        label="Description"
        name="description"
        placeholder="This department is one of the best departments in ..."
        description="A description of the department"
        errorMessage={methods.formState.errors.description?.message}
      />
    </div>
  );
};



const ModulesSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle
        title="Modules"
        description="A module could be a class or a lecture, a test, a workshop, a project etc."
      />

      {/* Search <-> delete, Add module */}
      <div className="mt-1 flex justify-between">
        <Input className="" />

        <div className="flex gap-2">
          <Button variant={"secondary"} type="button">
            <LuTrash2 />
            <p className="hidden pl-2 md:block">Delete</p>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"tertiary"} type="button">
                <MdAdd size={20} />
                <p className="pl-0.5 md:hidden">Add</p>
                <p className="hidden pl-0.5 md:block">Add module</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="h-3/4 rounded-lg px-0 py-0 md:max-w-3xl gap-0 bg-cc-background">
              <AddModuleDialog />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <h1>#TABLE</h1>
    </div>
  )
}
