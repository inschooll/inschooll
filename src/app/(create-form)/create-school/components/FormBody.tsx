"use client";
import { useState, type FormEvent } from "react";
import Button from "~/app/_components/buttons/button";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";
import LabelTextareaField from "~/app/_components/inputs/label_textarea_field";
import SchoolNameAndAcronymInputFields from "./SchoolAcronymFields";
import { api } from "~/trpc/react";
import { usePopUpStore } from "~/app/_components/popups/popup_store";
import { getErrorMessage } from "~/app/core/utils";
import Image from "next/image";
import CoverAndLogoSection from "./CoverAndLogoSection";


export function FormBody() {
  const [schoolNameIsValid, setSchoolNameIsValid] = useState<boolean>();
  const {addPopup} = usePopUpStore();

  const { isLoading, mutate: createSchool } = api.school.create.useMutation({
    onSuccess: (_data, _variables, _context) => {
      addPopup({text: 'School was successfully created!', type: 'success'})
    },
    onError: (error) => {
      addPopup({text: getErrorMessage(error.message), type: 'error'})
    }
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

    const schoolData = {
      name: name.value,
      acronym: acronym.value,
      motto: motto.value,
      about: about.value,
      country: country.value,
      state: state.value,
      address: address.value,
      coverUrl: 'https://binghamuni.edu.ng/v2/images/gate.jpg',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Bingham_University_logo.png',
      email: email.value,
      phone1: phone1.value,
      phone2: phone2.value,
      phone3: phone3.value,
      websiteUrl: website.value,
      facebookUrl: facebook.value,
      twitterUrl: twitter.value,
      instagramUrl: instagram.value,
    };

    console.log(schoolData);
    console.log(schoolData.phone2);
    console.log(schoolData.phone3);
    
    // create school
    createSchool(schoolData);
  }

  

  return (
    <form onSubmit={onSubmit}>
      <CoverAndLogoSection />

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
              type={schoolNameIsValid ? "submit" : "button"}
              isLoading={isLoading}
              onClick={() => {
                // Run some logic to validate data
                if (!schoolNameIsValid) {
                  // alert('School Name is invalid!');
                  addPopup({text: 'The school name you entered already exists!', type: 'error'})
                }
              }}
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