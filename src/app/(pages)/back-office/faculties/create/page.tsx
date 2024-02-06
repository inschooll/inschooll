"use client";
import React, { useState } from "react";
import { SectionTitle } from "../../_components/section-title";
import Input, { InputLabel } from "~/components/inputs/input";
import { Button } from "~/components/ui/button";
import TextareaField from "~/components/inputs/textarea_field";
import DropdownButton from "~/components/inputs/dropdown-button";
import { FormProvider, useForm } from "react-hook-form";
import { FacultySchema, type TFacultySchema } from "~/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const methods = useForm<TFacultySchema>({
    resolver: zodResolver(FacultySchema),
  });
  const [hasCode, setHasCode] = useState(false);
  const [isAccredited, setIsAccredited] = useState(false);

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <SectionTitle title="Faculty" variant="lg" />
          {/* Name */}
          <Input
            label="Faculty name"
            name="name"
            description="The name of the faculty e.g Engineering, Sciences, Business, Mathematics and Statistics"
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
              <InputLabel
                label="This faculty has a code"
                description="The faculty code is a unique identifier used for identifying a particular faculty within a faculty"
              />
              {hasCode && (
                <Input name="code" placeholder="(Optional)" type="text" />
              )}
            </div>
          </div>
          {/* Dean */}
          <DropdownButton
            label="Dean"
            name="dean"
            description="A dean is primarily a university officer who is the head of a particular faculty"
            options={[]}
            updateSelected={(index) => console.log("picked", index)}
          />
          {/*  Established at */}
          <DropdownButton
            label="Established at"
            name="establishedAt"
            description="When the faculty was established"
            options={[]}
            updateSelected={(index) => console.log("picked", index)}
            errorMessage={methods.formState.errors.establishedAt?.message}
          />
          {/*  Location */}
          <Input
            label="Location"
            name="location"
            description="Where the faculty is located at"
            type="text"
            placeholder="(Optional)"
          />
          {/* Description */}
          <TextareaField
            label="Description"
            name="description"
            placeholder="This faculty is one of the best faculties for ..."
            description="A description of the faculty"
            errorMessage={methods.formState.errors.description?.message}
          />
          {/*  Website */}
          <Input
            label="Website"
            name="website"
            description="The official website url of the faculty"
            placeholder="(Optional)"
            type="text"
          />
          {/*  Email */}
          <Input
            label="Email"
            name="email"
            description="The official email address of the faculty"
            placeholder="(Optional)"
            type="text"
          />
          {/*  Phone Number */}
          <Input
            label="Phone Number"
            name="phoneNumber"
            description="The official phone number of the faculty"
            placeholder="(Optional)"
            type="text"
          />

          {/* Is Accredited */}
          <div className="flex gap-2">
            <Input type="checkbox" className="mt-2" onChange={e => setIsAccredited(e.target.checked)} />
            <div>
              <InputLabel
                label="This department is accredited"
                description="Accreditation is the recognition from an accrediting agency that an institution maintains a high level of educational standards"
              />

              {/* Last Accreditation */}
              {isAccredited && <DropdownButton
                label="Last accredited at"
                name="lastAccredited"
                options={[]}
                updateSelected={(index) => console.log("picked", index)}
              />}
            </div>
          </div>

          {/* Create */}
          <div className="mt-5">
            <Button variant={"default"} size={"lg"} className="w-full">
              Create
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
