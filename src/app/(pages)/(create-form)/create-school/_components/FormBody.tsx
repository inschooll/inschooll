"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OnboardingTitleAndDescription } from "~/app/(pages)/onboarding/page";
import InfoBox from "~/components/cards/InfoBox";
import Divider from "~/components/divider";
import Input, { LabelAndDescription } from "~/components/inputs/input";
import TextareaField from "~/components/inputs/textarea_field";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { SchoolSchema, type TSchoolSchema } from "~/lib/types";
import { getAcronym } from "~/lib/utils";
import { uploadImage } from "~/lib/utils-client";
import { api } from "~/trpc/react";
import CoverAndLogoSection from "./CoverAndLogoSection";
import CountryAndStateFields from "./country-state-fields";
import EducationLevel_SchoolType_EstablishmentDate from "./educationlevel-schooltype-establishmentdate";
import PhoneNumbers from "./phone-numbers";
import Socials from "./socials";
import { useDebounce } from "~/lib/hooks";

export function FormBody() {
  const { toast } = useToast();
  const methods = useForm<TSchoolSchema>({
    resolver: zodResolver(SchoolSchema),
  });
  const formData = methods.getValues();
  const watch = methods.watch();

  // fields (cover, logo)
  const [coverFile, setCoverFile] = useState<File>();
  const [logoFile, setLogoFile] = useState<File>();

  // TODO: this should be provided by React Hook Form
  const [schoolNameIsValid, setSchoolNameIsValid] = useState<boolean>();

  // trpc
  const { mutateAsync: getPresignedURL } =
    api.aws.getPresignedURL.useMutation();
  const { mutate: schoolByNameExist, isLoading: nameIsLoading } =
    api.school.byNameExist.useMutation({
      onError: (error) => {
        console.log("ERROR: school name already exists!", error);
      },
      onSuccess: (data) => {
        if (data.id) return setSchoolNameIsValid(false);
        setSchoolNameIsValid(true);
      },
    });
  const { mutate: createSchool } = api.school.create.useMutation({
    onError: (error) => {
      toast({ description: error.message });
    },
    onSuccess: (_data, _variables, _context) => {
      toast({ description: "School created!" });
    },
  });

  // TODO: implement useDebounce instead
  // make school name request only when user has not typed a character in 2 seconds
  const debouncedName = useDebounce(watch.name);
  useEffect(() => {
    const acronym = getAcronym(formData.name);
    methods.setValue("acronym", acronym ?? "");
  }, [formData.name, methods, watch.name]);

  useEffect(() => {
    console.log('Request sent!!!')
    schoolByNameExist({ name: formData.name });
  }, [debouncedName, formData.name, schoolByNameExist]);

  // displays an error container with a message at the top of the form
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const showError = (msg: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return setInputErrorMessage(msg);
  };

  const handleSubmit = () => {
    methods.handleSubmit(async (data) => {
      // ensure logo and cover images were selected
      console.log("form is valid");
      if (!coverFile)
        return showError("Please select a cover image for your school");
      if (!logoFile)
        return showError("Please select a logo image for your school");

      // upload image to s3 bucket
      const coverKey = await uploadImage({ file: coverFile, getPresignedURL });
      const logoKey = await uploadImage({ file: logoFile, getPresignedURL });

      // create school
      // TODO: add data to school itself
      console.log(data);
      createSchool({ coverKey, logoKey, ...data });
    });
  };

  const updateMethod = (key: keyof TSchoolSchema, value: string) => {
    methods.setValue(key, value);
  };

  return (
    <FormProvider {...methods}>
      <OnboardingTitleAndDescription
        title="Create school"
        description="Fill up the form and submit it in order to create a school."
        className="pb-10 pt-7"
      />

      <form onSubmit={handleSubmit}>
        <CoverAndLogoSection
          setCoverFile={setCoverFile}
          setLogoFile={setLogoFile}
        />

        {!!inputErrorMessage && (
          <InfoBox text={inputErrorMessage} variant="error" />
        )}

        <div className="mt-10 px-5">
          <div className="space-y-5">
            {/* School name and Acronym */}
            <div className="flex gap-5">
              <div className="flex-1">
                <Input
                  label="School name"
                  name="name"
                  placeholder="Harvard school"
                  className="h-11 w-full"
                  isValid={formData.name === "" ? undefined : schoolNameIsValid}
                  isLoading={nameIsLoading && !!formData.name.length}
                />

              </div>
              <Input
                label="Acronym"
                name="acronym"
                className="h-11 w-full"
                placeholder="HVD"
              />
            </div>

            {/* Motto */}
            <Input
              label="Motto"
              name="motto"
              className="h-11 w-full md:w-96"
              placeholder="shaping the leaders of tomorrow"
            />

            {/* About */}
            <TextareaField
              label="About"
              name="about"
              placeholder="Harvard school is a private Ivy League research school in Cambridge..."
              errorMessage={methods.formState.errors.about?.message}
            />

            {/* Country and State*/}
            <CountryAndStateFields
              updateMethod={updateMethod}
              countryErrorMsg={methods.formState.errors.country?.message}
              stateErrorMsg={methods.formState.errors.state?.message}
            />

            {/* Address */}
            <Input
              label="Address"
              name="address"
              className="h-11 w-full"
              placeholder="Massachusetts Hall, Cambridge, MA 02138, United States"
              description="The address of the school"
            />

            <EducationLevel_SchoolType_EstablishmentDate
              updateMethod={updateMethod}
            />

            {/* SECTION - contact information */}
            <div className="flex flex-col gap-5 pt-10">
              <div className="space-y-5">
                <h3 className="text-xl font-bold">Contact information</h3>
                <Divider />
              </div>

              {/* Email */}
              <Input
                label="Email address"
                name="email"
                type="email"
                placeholder="harvard@gmail.com"
                description="The schools email address"
                className="h-11 w-full md:w-[280px]"
              />
            </div>

            {/* Website */}
            <div>
              <LabelAndDescription
                label="Website"
                description="The official website of the school"
              />

              <div className="flex gap-2" style={{ margin: 0 }}>
                <div className="flex size-11 items-center justify-center rounded-lg border border-cc-border ">
                  <Globe className="text-zinc-500" />
                </div>
                <div className="flex-1">
                  <Input
                    name="website"
                    placeholder="https://www.harvard.edu/"
                    description="The official website of the school"
                    className="h-11 w-full md:w-[25rem]"
                  />
                </div>
              </div>
            </div>

            {/* Phone numbers */}
            <PhoneNumbers />

            {/* Socials */}
            <Socials />

            {/* Submit Button */}
            <div className="pt-10">
              <Button
                type="submit"
                // isLoading={methods.formState.isSubmitting}
                disabled={methods.formState.isSubmitting}
                size="lg"
                className="w-full py-6"
              >
                Create School
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}




