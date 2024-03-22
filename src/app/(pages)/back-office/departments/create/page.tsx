"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useState } from "react";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import { LuTrash2 } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import DropdownButton from "~/components/inputs/dropdown-button";
import Input, { LabelAndDescription } from "~/components/inputs/input";
import TextareaField from "~/components/inputs/textarea_field";
import NavbarWithIndex from "~/components/navbar-with-index";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { DepartmentSchema, type TDepartmentSchema } from "~/lib/types";
import { SectionTitle } from "../../_components/section-title";
import AddProgrammeDialog from "./_components/programme-dialog";

type TSemester = {
  semesterCount: number
}

export const SemesterContext = createContext<TSemester | null>(null);

export const useSemesterContext = () => {
  const context = useContext(SemesterContext);
  if (context === null) throw new Error('useSemesterContext must be used within a SemesterContext provider');

  return context;
}

export default function Page() {
  const methods = useForm<TDepartmentSchema>({
    resolver: zodResolver(DepartmentSchema),
  });

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <SemesterContext.Provider value={{semesterCount: 2}} >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            {/* Section 1 */}
            <MainSection methods={methods} />

            {/* Section 2 - Programme */}
            <ProgrammeSection />

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
  const [hasCode, setHasCode] = useState(false);
  const [hasHod, setHasHod] = useState(false);
  const [isAccredited, setIsAccredited] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Department" variant="lg" />
      {/* Name */}
      <Input
        label="Department name"
        name="name"
        description="The name of the department. e.g Computer Science"
        type="text"
      />

      {/* Code */}
      <div className="flex gap-2">
        <Input
          type="checkbox"
          className="mt-2"
          onChange={(e) => setHasCode(e.target.checked)}
        />
        <div>
          <LabelAndDescription
            label="This department has a code"
            description="The department code is a unique identifier used for identifying a particular department within a faculty"
          />
          {hasCode && (
            <Input name="code" placeholder="(Optional)" type="text" />
          )}
        </div>
      </div>
      {/* Hod */}
      <div className="flex gap-2">
        <Input
          type="checkbox"
          className="mt-2"
          onChange={(e) => setHasHod(e.target.checked)}
        />
        <div>
          <LabelAndDescription
            label="This department has a HOD (Head of Department)"
            description="The Head of Department is the academic leader of the department"
          />
          {hasHod && (
            <DropdownButton
              name="hod"
              options={[]}
              updateSelected={(index) => console.log("picked", index)}
            />
          )}
        </div>
      </div>

      {/*  Faculty */}
      <DropdownButton
        label="Departments faculty"
        name="faculty"
        description="The faculty that this department belongs to"
        options={[]}
        updateSelected={(index) => console.log("picked", index)}
      />

      {/*  Established at */}
      <DropdownButton
        label="Established at"
        name="establishedAt"
        description="When the department was established"
        options={[]}
        updateSelected={(index) => console.log("picked", index)}
      />

      {/* Building */}
      <DropdownButton
        label="Building"
        name="building"
        description="The building this department is located at"
        options={[]}
        updateSelected={(index) => console.log("picked", index)}
      />

      {/* Description */}
      <TextareaField
        label="Description"
        name="description"
        placeholder="This department is one of the best departments in ..."
        description="A description of the department"
        errorMessage={methods.formState.errors.description?.message}
      />

      {/*  Website */}
      <Input
        label="Website"
        name="website"
        description="The official website url of the department"
        placeholder="(Optional)"
        type="text"
      />
      {/*  Email */}
      <Input
        label="Email"
        name="email"
        description="The official email address of the department"
        placeholder="(Optional)"
        type="text"
      />
      {/*  Phone Number */}
      <Input
        label="Phone Number"
        name="phoneNumber"
        description="The official phone number of the department"
        placeholder="(Optional)"
        type="text"
      />

      {/* Is Accredited */}
      <div className="flex gap-2">
        <Input
          type="checkbox"
          className="mt-2"
          onChange={(e) => setIsAccredited(e.target.checked)}
        />
        <div>
          <LabelAndDescription
            label="This department is accredited"
            description="Accreditation is the recognition from an accrediting agency that an institution maintains a high level of educational standards"
          />

          {/* Last Accreditation */}
          {isAccredited && (
            <DropdownButton
              label="Last accredited at"
              name="lastAccredited"
              options={[]}
              updateSelected={(index) => console.log("picked", index)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ProgrammeSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navItems = [
    { text: "Associate degree" },
    { text: "Bachelors degree" },
    { text: "Masters degree" },
    { text: "Doctorate degree" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle
        title="Programme"
        description="An academic programme refers to a structured set of courses and educational activities offered by an educational institution, such as a university or college, that leads to the attainment of a specific academic degree or qualification"
      />

      {/* Search <-> Add degree and co */}
      <div className="mt-1 flex justify-between">
        <Input />

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
                <p className="hidden pl-0.5 md:block">Add programme</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="h-3/4 rounded-lg px-0 py-0 md:max-w-3xl gap-0 bg-cc-background">
              <AddProgrammeDialog />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <NavbarWithIndex
        navItems={navItems}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
};