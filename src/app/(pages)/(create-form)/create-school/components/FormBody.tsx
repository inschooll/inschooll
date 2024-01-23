"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { countries_data } from "scripts/data/countries_data";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import images from "~/app/core/constants/images";
import successMessages from "~/app/core/constants/success-messages";
import Button from "~/components/buttons/button";
import DropdownButton from "~/components/inputs/dropdown-button";
import Input from "~/components/inputs/label_text_input_field";
import TextareaField from "~/components/inputs/textarea_field";
import { usePopUpStore } from "~/components/popups/popup_store";
import { uploadImage, useHandleError } from "~/core/utils-client";
import { api } from "~/trpc/react";
import CoverAndLogoSection from "./CoverAndLogoSection";
import { SchoolSchema, type TSchoolSchema } from "~/lib/types";
import InfoBox from "~/components/cards/InfoBox";


export function FormBody() {
  const methods = useForm<TSchoolSchema>({
    resolver: zodResolver(SchoolSchema),
  });
  const formData = methods.getValues();

  // fields (cover, logo)
  const [coverFile, setCoverFile] = useState<File>();
  const [logoFile, setLogoFile] = useState<File>();
  // TODO: This should be provided by React Hook Form
  
  const [schoolNameIsValid, setSchoolNameIsValid] = useState<boolean>();

  // countries & states
  const countries = countries_data;
  const [states, setStates] = useState(countries_data[0]!.states);
  
  // popup store
  const { addPopup } = usePopUpStore();
  const { handleError } = useHandleError();

  // trpc
  const {mutateAsync: getPresignedURL} = api.aws.getPresignedURL.useMutation();
  const {mutate: schoolByNameExist, isLoading: nameIsLoading} = api.school.byNameExist.useMutation({
    onError: (error) => {
      console.log('ERROR: school name already exists!', error)
    },
    onSuccess: (data) => {
      if (data.id) return setSchoolNameIsValid(false);
      setSchoolNameIsValid(true);
    },
  });
  const { mutate: createSchool } = api.school.create.useMutation({
    onError: (error) => {
      handleError({msg: error.message});
    },
    onSuccess: (_data, _variables, _context) => {
      addPopup({text: successMessages.schoolCreated, type: 'success'});
      
    },
  });

  // make school name request only when user has not typed a character in 2 seconds
  const [shouldMakeNameRequest, setShouldMakeNameRequest] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => setShouldMakeNameRequest(true), 2000);
    return () => clearTimeout(timerId);
  }, [formData.name]);

  useEffect(() => {
    if (shouldMakeNameRequest) {
      // make API request. check if school with name exists
      schoolByNameExist({name: formData.name})
      // Reset shouldMakeRequest
      setShouldMakeNameRequest(false);
    }
  }, [shouldMakeNameRequest, formData.name, schoolByNameExist]);

  const getAcronym = (name?: string) => {
    if (name && name.length < 4) return name.toUpperCase();
    // e.g input -> Bingham Nestle University
    //     output -> BNU
    return name
      ?.split(" ")
      .map((value, i) => (i < 3 ? value[0] : ""))
      .join("")
      .toUpperCase();
  };

  // displays an error container with a message at the top of the form
  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const showError = (msg: string) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    return setInputErrorMessage(msg)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(async (data) => {
        // ensure logo and cover images were selected
        if (!coverFile) return showError("Please select a cover image for your school");
        if (!logoFile) return showError("Please select a logo image for your school");
        
        // upload image to s3 bucket
        const coverKey = await uploadImage({file: coverFile, getPresignedURL});
        const logoKey = await uploadImage({file: logoFile, getPresignedURL});
        
        // create school
        // TODO: add data to school itself
        console.log(data);
        createSchool({ coverKey, logoKey, ...data});
      })} >

        <CoverAndLogoSection setCoverFile={setCoverFile} setLogoFile={setLogoFile} />

        {!!inputErrorMessage && (<InfoBox text={inputErrorMessage} type="error" />)}

        <div className="mt-10 px-5">
          <div className="flex flex-col gap-5">
            {/* School name and Acronym */}
            <div className="grid grid-cols-2 gap-5">
              <Input
                label="School name"
                name="name"
                placeholder="Harvard university"
                inputIsValid={formData.name === '' ? undefined : schoolNameIsValid}
                inputIsLoading={nameIsLoading && !!formData.name.length}
                onChange={(e) => {
                  const acronym = getAcronym(e.target.value);
                  methods.setValue('acronym', acronym ?? '');
                }}
                explanation={"This will be the name of the university/college"}
              />
              <div>
                <Input
                  label="Acronym"
                  name="acronym"
                  placeholder="HVD"
                />
                <div className="mt-2 text-xs text-cc-content-main/50">
                  <p>
                    e.g <b>HVD</b>/20/04/05/0010
                  </p>
                </div>
              </div>
            </div>

            {/* Motto */}
            <Input
              label="Motto"
              name="motto"
              placeholder="shaping the leaders of tomorrow"
              explanation="This will be a short sentence or phrase that  encapsulates the beliefs or ideals of the school"
            />

            {/* About */}
            <TextareaField
              label="About"
              name="about"
              placeholder="Harvard University is a private Ivy League research university in Cambridge..."
              description="Tell us about the university"
              errorMessage={methods.formState.errors.about?.message}
            />

            {/* Country and State*/}
            <div className="grid grid-cols-2 gap-5">
              {/* country */}
              <div>
                  <DropdownButton 
                    label="Country"
                    name="country"
                    required
                    options={countries.map(({name}) => ({
                      icon: <Image src={images.countryFlag(name)} alt={name} height={20} width={20} />,
                      title: name,
                    }))}
                    updateSelected={(index) => {
                      methods.setValue('country', countries[index]!.name)
                      methods.setValue('state', '')
                      // update states
                      setStates(countries[index]!.states);
                    }}
                    errorMessage={methods.formState.errors.country?.message}
                  />
              </div>
              {/* state */}
              <div>
                  <DropdownButton 
                    label="State"
                    required
                    name="state"
                    options={states.length > 0 ? states.map(state => state.name) : [formData.country]}
                    updateSelected={(index) => {
                      methods.setValue('state', states[index]?.name ?? 'All');
                    }}
                    errorMessage={methods.formState.errors.state?.message}
                  />
              </div>
            </div>


            {/* Address */}
            <Input
              label="Address"
              name="address"
              placeholder="Massachusetts Hall, Cambridge, MA 02138, United States"
              explanation="Where the university is located in the state"
            />

            {/* SECTION - contact information */}
            <div className="mt-10 flex flex-col gap-5">
              <div className="">
                <h3 className="text-xl font-bold">Contact</h3>
              </div>

              {/* Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="harvard@gmail.com"
                explanation="The universities email"
                
              />

              {/* Phone 1, Phone 2, Phone 3 */}
              <div className="grid grid-cols-3 gap-5">
                <Input
                  label="Phone 1"
                  name="phone1"
                  placeholder="+1 617-495-1000"
                  
                />
                <Input
                  label="Phone 2"
                  name="phone2"
                  placeholder="Optional"
                />
                <Input
                  label="Phone 3"
                  name="phone3"
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* SECTION - Links */}
            <div className="mt-10 flex flex-col gap-5">
              <div className="">
                <h3 className="text-xl font-bold">Links</h3>
              </div>

              {/* Website */}
              <Input
                label="Website"
                name="website"
                placeholder="https://www.harvard.edu/"
                explanation="The official website of the university"
                
              />

              {/* Facebook, Twitter, Instagram */}
              <div className="grid grid-cols-3 gap-5">
                <Input
                  label="Facebook"
                  name="facebook"
                  placeholder="instagram.com/Harvard"
                />
                <Input
                  label="Twitter"
                  name="twitter"
                  placeholder="twitter.com/Harvard"
                />
                <Input
                  label="Instagram"
                  name="instagram"
                  placeholder="instagram.com/Harvard"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <Button
                type="submit"
                isLoading={methods.formState.isSubmitting}
                size="lg"
                variant="defaultFull"
                onClick={() => {
                  console.log('Submit Button clicked!')
                  console.log(formData);
                }}
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