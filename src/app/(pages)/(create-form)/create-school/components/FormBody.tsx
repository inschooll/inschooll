"use client";
import { useState, type FormEvent } from "react";
import Button from "~/app/_components/buttons/button";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";
import LabelTextareaField from "~/app/_components/inputs/label_textarea_field";
import SchoolNameAndAcronymInputFields from "./SchoolAcronymFields";
import { api } from "~/trpc/react";
import { usePopUpStore } from "~/app/_components/popups/popup_store";
import { getErrorMessage } from "~/app/core/utils";
import CoverAndLogoSection from "./CoverAndLogoSection";
import { uploadImage } from "~/core/utils-client";


export function FormBody() {
  // fields (cover, logo)
  const [coverFile, setCoverFile] = useState<File>();
  const [logoFile, setLogoFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const [redirectSchoolName, setRedirectSchoolName] = useState<string>();
  const [schoolNameIsValid, setSchoolNameIsValid] = useState<boolean>();
  // zustand - popup
  const {addPopup} = usePopUpStore();

  // trpc
  const {mutateAsync: getPresignedURL} = api.aws.getPresignedURL.useMutation();
  const { isLoading, mutate: createSchool } = api.school.create.useMutation({
    onSuccess: (_data, _variables, _context) => {
      addPopup({text: 'School was successfully created!', type: 'success'});
      if (redirectSchoolName) {
      }

    },
    onError: (error) => {
      addPopup({text: getErrorMessage(error.message), type: 'error'})
    }
  });

  function formIsValid () {
    // Run some logic to validate data
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const schoolName = document.querySelector('input[name="school_name"]') as HTMLInputElement;
    if (schoolName.value.length > 0 && !schoolNameIsValid) {
      addPopup({text: 'The school name you entered already exists!', type: 'error'});
      return false;
    } 
    if (!coverFile) {
      addPopup({text: "Please select a school Cover image!", type: 'error'});
      return false;
    } 
    if (!logoFile) {
      addPopup({text: "Please select a school Logo!", type: 'error'});
      return false;
    }
    
    return true;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formIsValid()) return;
    
    // school fields
    const formElements = e.currentTarget.elements;
    const name = formElements.namedItem('school_name') as HTMLInputElement;
    const acronym = formElements.namedItem('acronym') as HTMLInputElement;
    const motto = formElements.namedItem('motto') as HTMLInputElement;
    const about = formElements.namedItem('about') as HTMLInputElement;
    const country = formElements.namedItem('country') as HTMLInputElement;
    const state = formElements.namedItem('state') as HTMLInputElement;
    const address = formElements.namedItem('address') as HTMLInputElement;
    const email = formElements.namedItem('email') as HTMLInputElement;
    const phone1 = formElements.namedItem('phone_1') as HTMLInputElement;
    const phone2 = formElements.namedItem('phone_2') as HTMLInputElement;
    const phone3 = formElements.namedItem('phone_3') as HTMLInputElement;
    const website = formElements.namedItem('website') as HTMLInputElement;
    const facebook = formElements.namedItem('facebook') as HTMLInputElement;
    const twitter = formElements.namedItem('twitter') as HTMLInputElement;
    const instagram = formElements.namedItem('instagram') as HTMLInputElement;
    
    const coverKey = await uploadImage({file: coverFile!, getPresignedURL});
    const logoKey = await uploadImage({file: logoFile!, getPresignedURL});
    
    const schoolData = {
      cover: coverKey,
      logo: logoKey,
      name: name.value,
      acronym: acronym.value,
      motto: motto.value,
      about: about.value,
      country: country.value,
      state: state.value,
      address: address.value,
      email: email.value,
      phone1: phone1.value,
      phone2: phone2.value,
      phone3: phone3.value,
      websiteUrl: website.value,
      facebookUrl: facebook.value,
      twitterUrl: twitter.value,
      instagramUrl: instagram.value,
    };
    
    // create school
    setIsSubmitting(false);
    setRedirectSchoolName(name.value);
    createSchool(schoolData);
  }

  return (
    <form onSubmit={onSubmit}>

      <CoverAndLogoSection setCoverFile={setCoverFile} setLogoFile={setLogoFile} />

      <div className="mt-10 px-5">
        <div className="flex flex-col gap-5">
          {/* School name and Acronym */}
          <div className="grid grid-cols-2 gap-5">
            <SchoolNameAndAcronymInputFields nameIsValid={schoolNameIsValid} setNameIsValid={setSchoolNameIsValid} />
          </div>

          {/* Motto */}
          <LabelAndTextInputField
            label="Motto"
            name="motto"
            placeholder="shaping the leaders of tomorrow"
            explanation="This will be a short sentence or phrase that  encapsulates the beliefs or ideals of the school"
            required
          />

          {/* About */}
          <LabelTextareaField
            label="About"
            name="about"
            minLength={1}
            placeholder="Harvard University is a private Ivy League research university in Cambridge..."
            explanation="Tell us about the university"
            required
          />

          {/* Country and State*/}
          <div className="grid grid-cols-2 gap-5">
            {/* TODO: make this a drop down that shows a list of countries */}
            <LabelAndTextInputField
              label="Country"
              name="country"
              placeholder="United states of america"
              explanation={
                "This is the country where the university is located at"
              }
              required
            />
            <LabelAndTextInputField
              label="State"
              name="state"
              placeholder="Massachusetts"
              explanation={
                "This is the state where in the country where the university is located at"
              }
              required
            />
          </div>

          {/* Address */}
          <LabelAndTextInputField
            label="Address"
            name="address"
            placeholder="Massachusetts Hall, Cambridge, MA 02138, United States"
            explanation="Where the university is located in the state"
            required
          />

          {/* SECTION - contact information */}
          <div className="mt-10 flex flex-col gap-5">
            <div className="">
              <h3 className="text-xl font-bold">Contact</h3>
            </div>

            {/* Email */}
            <LabelAndTextInputField
              label="Email"
              name="email"
              type="email"
              placeholder="harvard@gmail.com"
              explanation="The universities email"
              required
            />

            {/* Phone 1, Phone 2, Phone 3 */}
            <div className="grid grid-cols-3 gap-5">
              <LabelAndTextInputField
                label="Phone 1"
                name="phone_1"
                placeholder="+1 617-495-1000"
                required
              />
              <LabelAndTextInputField
                label="Phone 2"
                name="phone_2"
                placeholder="Optional"
              />
              <LabelAndTextInputField
                label="Phone 3"
                name="phone_3"
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
            <LabelAndTextInputField
              label="Website"
              name="website"
              placeholder="https://www.harvard.edu/"
              explanation="The official website of the university"
              required
            />

            {/* Facebook, Twitter, Instagram */}
            <div className="grid grid-cols-3 gap-5">
              <LabelAndTextInputField
                label="Facebook"
                name="facebook"
                placeholder="instagram.com/Harvard"
              />
              <LabelAndTextInputField
                label="Twitter"
                name="twitter"
                placeholder="twitter.com/Harvard"
              />
              <LabelAndTextInputField
                label="Instagram"
                name="instagram"
                placeholder="instagram.com/Harvard"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <Button
              type={"submit"}
              isLoading={isLoading || isSubmitting}
              size="lg"
              variant="defaultFull"
            >
              Create School
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}