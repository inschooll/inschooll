"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { countries_data } from "scripts/data/countries_data";
import validator from 'validator';
import Button from "~/app/_components/buttons/button";
import DropdownButton from "~/app/_components/inputs/dropdown-button";
import Label from "~/app/_components/inputs/label";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";
import LabelTextareaField from "~/app/_components/inputs/label_textarea_field";
import { usePopUpStore } from "~/app/_components/popups/popup_store";
import images from "~/app/core/constants/images";
import successMessages from "~/app/core/constants/success-messages";
import { isPhoneNumber, uploadImage, useHandleError } from "~/core/utils-client";
import { api } from "~/trpc/react";
import CoverAndLogoSection from "./CoverAndLogoSection";


export function FormBody() {
  const formRef = useRef<HTMLFormElement>();
  const [input, setInput] = useState({
    name: '',
    acronym: '',
    motto: '',
    about: '',
    country: '',
    state: '',
    address: '',
    email: '',
    phone1: '',
    phone2: '',
    phone3: '',
    website: '',
    facebook: '',
    twitter: '',
    instagram: '',
  });

  // fields (cover, logo)
  const [coverFile, setCoverFile] = useState<File>();
  const [logoFile, setLogoFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
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
      console.log('ERROR: school name already exists!')
    },
    onSuccess: (data) => {
      if (data.id) return setSchoolNameIsValid(false);
      setSchoolNameIsValid(true);
    },
  });
  const { isLoading, mutate: createSchool } = api.school.create.useMutation({
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
  }, [input.name]);

  useEffect(() => {
    if (shouldMakeNameRequest) {
      // make API request. check if school with name exists
      schoolByNameExist({name: input.name})
      // Reset shouldMakeRequest
      setShouldMakeNameRequest(false);
    }
  }, [shouldMakeNameRequest, input.name, schoolByNameExist]);

  function formIsValid () {
    // cover
    if (!coverFile) return addPopup({text: "Please select a school cover image!", type: 'error'});
    // logo
    if (!logoFile) return addPopup({text: "Please select a school logo!", type: 'error'});    
    // name
    if (input.name !== '') return addPopup({text: 'School name is required', type: 'error'});
    if (!schoolNameIsValid) return addPopup({text: 'The school name you entered already exists!', type: 'error'});
    // acronym
    if (!input.acronym) return addPopup({text: "Acronym is required", type: 'error'});
    // motto
    if (!input.motto) return addPopup({text: "Motto is required", type: 'error'});
    // about
    if (!input.about) return addPopup({text: "About is required", type: 'error'});
    // country
    if (!input.country) return addPopup({text: "Country is required", type: 'error'});
    // address
    if (!input.address) return addPopup({text: "Address is required", type: 'error'});
    // email
    if (!validator.isEmail(input.email)) return addPopup({text: "Enter a valid email", type: 'error'});
    // phone1
    if (!isPhoneNumber(input.phone1)) return addPopup({text: "phone1 is required", type: 'error'});
    // phone2
    if (input.phone2.length > 0 && isPhoneNumber(input.phone2)) return addPopup({text: "phone2 is not valid", type: 'error'});
    // phone3
    if (input.phone3.length > 0 && isPhoneNumber(input.phone3)) return addPopup({text: "phone3 is not valid", type: 'error'});
    // website
    if (validator.isURL(input.website)) return addPopup({text: "Enter the schools website url", type: 'error'});
    // facebook
    if (input.facebook.length > 0 && !validator.isURL(input.facebook)) return addPopup({text: "Enter the schools Facebook page url", type: 'error'});
    // twitter
    if (input.twitter.length > 0 && !validator.isURL(input.twitter)) return addPopup({text: "Enter the schools Twitter page url", type: 'error'});
    // instagram
    if (input.instagram.length > 0 && !validator.isURL(input.instagram)) return addPopup({text: "Enter the schools Instagram page url", type: 'error'});
    return true;
  }

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

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setInput((data) => ({ ...data, [name]: value }));
  }

  return (
    <form onSubmit={() => console.log('submit')} >

      <CoverAndLogoSection setCoverFile={setCoverFile} setLogoFile={setLogoFile} />

      <div className="mt-10 px-5">
        <div className="flex flex-col gap-5">
          {/* School name and Acronym */}
          <div className="grid grid-cols-2 gap-5">
            {/* <SchoolNameAndAcronymInputFields schoolName={input.name} schoolAcronym={input.acronym} onChange={onChange} nameIsValid={schoolNameIsValid} setNameIsValid={setSchoolNameIsValid} /> */}
            <LabelAndTextInputField
              label="School name"
              name="name"
              placeholder="Harvard university"
              inputIsValid={input.name === '' ? undefined : schoolNameIsValid}
              inputIsLoading={nameIsLoading && !!input.name.length}
              value={input.name}
              onChange={(e) => {
                onChange(e);
                // update acronym field
                const acronym = getAcronym(e.target.value);
                setInput((data) => ({ ...data, acronym: acronym ?? "" }));
              }}
              explanation={"This will be the name of the university/college"}
              required
            />
            <div>
              <LabelAndTextInputField
                label="Acronym"
                name="acronym"
                placeholder="HVD"
                value={input.acronym}
                onChange={onChange}
                required
              />
              <div className="mt-2 text-xs text-cc-content-main/50">
                <p>
                  e.g <b>HVD</b>/20/04/05/0010
                </p>
              </div>
            </div>
          </div>

          {/* Motto */}
          <LabelAndTextInputField
            label="Motto"
            name="motto"
            value={input.motto}
            onChange={onChange}
            placeholder="shaping the leaders of tomorrow"
            explanation="This will be a short sentence or phrase that  encapsulates the beliefs or ideals of the school"
            required
          />

          {/* About */}
          <LabelTextareaField
            label="About"
            name="about"
            minLength={1}
            value={input.about}
            onChange={onChange}
            placeholder="Harvard University is a private Ivy League research university in Cambridge..."
            explanation="Tell us about the university"
            required
          />

          {/* Country and State*/}
          <div className="grid grid-cols-2 gap-5">
            {/* country */}
            <div>
              <Label value="Country" isRequired={true} />
              <div className="mt-1">
                <DropdownButton 
                  name="country"
                  options={countries.map(({name}) => ({
                    icon: <Image src={images.countryFlag(name)} alt={name} height={20} width={20} />,
                    title: name,
                  }))}
                  updateSelected={(index) => {
                    setInput((data) => ({...data, state: '', country: countries[index]!.name}))
                    // update states
                    setStates(countries[index]!.states);
                  }}
                />
              </div>
            </div>
            {/* state */}
            <div>
              <Label value="State" isRequired={true} />
              <div className="mt-1">
                <DropdownButton 
                  name="state"
                  options={states.length > 0 ? states.map(state => state.name) : [input.country]}
                  updateSelected={(index) => {
                    setInput((data) => ({...data, state: states[index]?.name ?? 'All'}))
                  }}
                />
              </div>
            </div>
          </div>


          {/* Address */}
          <LabelAndTextInputField
            label="Address"
            name="address"
            value={input.address}
            onChange={onChange}
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
              value={input.email}
              onChange={onChange}
              placeholder="harvard@gmail.com"
              explanation="The universities email"
              required
            />

            {/* Phone 1, Phone 2, Phone 3 */}
            <div className="grid grid-cols-3 gap-5">
              <LabelAndTextInputField
                label="Phone 1"
                name="phone1"
                value={input.phone1}
                onChange={onChange}
                placeholder="+1 617-495-1000"
                required
              />
              <LabelAndTextInputField
                label="Phone 2"
                name="phone2"
                value={input.phone2}
                onChange={onChange}
                placeholder="Optional"
              />
              <LabelAndTextInputField
                label="Phone 3"
                name="phone3"
                value={input.phone3}
                onChange={onChange}
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
              value={input.website}
              onChange={onChange}
              placeholder="https://www.harvard.edu/"
              explanation="The official website of the university"
              required
            />

            {/* Facebook, Twitter, Instagram */}
            <div className="grid grid-cols-3 gap-5">
              <LabelAndTextInputField
                label="Facebook"
                name="facebook"
                value={input.facebook}
                onChange={onChange}
                placeholder="instagram.com/Harvard"
              />
              <LabelAndTextInputField
                label="Twitter"
                name="twitter"
                value={input.twitter}
                onChange={onChange}
                placeholder="twitter.com/Harvard"
              />
              <LabelAndTextInputField
                label="Instagram"
                name="instagram"
                value={input.instagram}
                onChange={onChange}
                placeholder="instagram.com/Harvard"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <Button
              type="button"
              isLoading={isLoading}
              size="lg"
              variant="defaultFull"
              onClick={async () => {
                if (!formIsValid()) return;

                const coverKey = await uploadImage({file: coverFile!, getPresignedURL});
                const logoKey = await uploadImage({file: logoFile!, getPresignedURL});
                
                // create school
                createSchool({ coverKey, logoKey, ...input});
              }}
            >
              Create School
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}