"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import LabelAndTextInputField, { Label } from "~/app/_components/inputs/label_text_input_field";
import Button from "~/app/_components/buttons/button";
import SelectInputField from "~/app/_components/inputs/select_input_field";
import constants from "~/app/core/constants/constants";
import countries_icons from "~/app/core/constants/countries_icons";
import TapOutsideLayout from "~/app/_components/layout/tap_outside_layout";
import TextInputField from "~/app/_components/inputs/text_input_field";

import { PiWarningBold } from 'react-icons/pi'
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Login = () => {
  return (
    <>
      {/* Line break */}
      
      {/* <div className="grid grid-cols-2 gap-2">
        <div
          className={"col-span-1 mt-5 h-[2px] w-full bg-cc-content-main/20"}
        ></div>
        <div
          className={"col-span-1 mt-5 h-[2px] w-full bg-cc-content-main/20"}
        ></div>
      </div> */}

      <FormBody />

      {/* Form */}
      <div className="mt-5"></div>
    </>
  );
};

export default Login;

function FormBody() {
  const [stage, setStage] = useState(1);
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInputErrorMessage("");
    const form = formRef.current;
    const firstName = form?.elements.namedItem('first_name') as HTMLInputElement;
    const lastName = form?.elements.namedItem('last_name') as HTMLInputElement;
    
    if (stage == 1 && firstName.value && lastName.value) {
      setStage(2);
      return;
    }

    const username = form?.elements.namedItem('username') as HTMLInputElement;
    if (stage == 2 && username.value) {
      setStage(3);
      return;
    }

    const email = form?.elements.namedItem('email') as HTMLInputElement;
    if (stage == 3 && email.value) {
      setStage(4);
      return;
    }

    const password = form?.elements.namedItem('password') as HTMLInputElement;
    const confirm = form?.elements.namedItem('confirm') as HTMLInputElement;
    if (password.value.length < 6) {
      setInputErrorMessage("Password should be 6 or more characters long!")
      return;
    }
    if (password.value !== confirm.value) {
      setInputErrorMessage("Passwords do not match!")
      return;
    }
    if (stage === 4 && password.value && confirm.value) {
      setStage(5);
      return;
    }

    const phone = form?.elements.namedItem('phone') as HTMLInputElement;
    if (stage === 5 && phone.value && country) {
      setStage(6);
      return;
    }

    if (stage === 6 && gender) {
      setStage(7);
      return;
    }

    if (stage === 7 && (!month || !day || !year)) {
      setInputErrorMessage("Enter your date of birth!");
      return;
    }

    // Create user
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {inputErrorMessage && 
      <div className="flex gap-4 items-center leading-5 w-full rounded bg-red-500 my-4 px-5 py-4">
        <PiWarningBold className="text-white" size={20} />
        <p className="text-white">{inputErrorMessage}</p>
      </div>}

      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* first name */}
        {stage > 0 && <div className="col-span-1">
          <LabelAndTextInputField
            label="first name"
            name="first_name"
            placeholder="First name"
            required
          />
        </div>}
        {/* Last name */}
        {stage > 0 && <div className="col-span-1">
          <LabelAndTextInputField
            label="last name"
            name="last_name"
            placeholder="Enter your last name..."
            required
          />
        </div>}

        {/* other names */}
        {stage > 1 && <div className="col-span-2">
          <LabelAndTextInputField
              label="username"
              name="username"
              placeholder="Enter your username..."
              required
            />
        </div>}

        {/* email */}
        {stage > 2 && <div className="col-span-2">
          <LabelAndTextInputField
            label="email"
            name="email"
            placeholder="email"
            required
          />
        </div>}

        {/* password, confirm password */}
        {stage > 3 && <div className="col-span-1">
          <LabelAndTextInputField
            label="password"
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </div>}
        {stage > 3 && <div className="col-span-1">
          <LabelAndTextInputField
            label="confirm password"
            name="confirm"
            type="password"
            placeholder="re-type password"
            required
          />
        </div>}
      </div>

      <div className="mt-5">
        {/* phone */}
        {stage > 4 && <PhoneLabelInputField
          pressOnChangeCountry={(value: string) => {
            setCountry(value);
          }}
        />}

        {/* gender */}
        {stage > 5 && <div className="col-span-3 mt-4">
          <Label className="mt-4" value={"Gender"} isRequired={false} />
          <SelectInputField
            name="gender"
            options={["male", "female"]}
            pressOnChange={setGender}
          />
        </div>}

        {/* date of birth */}
        {stage > 6 && <>
          <Label className="mt-4" value={"Date of birth"} isRequired={false} />
          <div className="grid grid-cols-3 gap-4">
            <SelectInputField
              name="month"
              options={constants.months}
              pressOnChange={setMonth}
            />
            <SelectInputField
              name="day"
              options={Array.from({ length: 31 }, (_, index) => `${index + 1}`)}
              pressOnChange={setDay}
            />
            <SelectInputField
              name="year"
              options={Array.from(
                { length: 60 },
                (_, index) => `${new Date().getFullYear() - index}`,
              )}
              pressOnChange={setYear}
            />
          </div>
        </>}

        {/* sign up button */}
        <div className="mt-5">
          <Button
            variant={"defaultFull"}
            size={"md"}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

interface PhoneCountryProps {
  pressOnChangeCountry: (value: string) => void;
}


const PhoneLabelInputField = ({pressOnChangeCountry} : PhoneCountryProps) => {
  const [showCountries, setShowCountries] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState('Nigeria');
  const [selectedCountryImg, setSelectedCountryImg] = React.useState(countries_icons.Nigeria);

  const update = (image: string, name: string) => {
    setSelectedCountry(name);
    setSelectedCountryImg(image);
    setShowCountries(false);
  }

  return ( 
  <div className="col-span-3">
    <p className="text-xs text-cc-content-main/50">{'Phone'}</p>
    <div className="mt-1 flex">
      {/* Select country */}
      <div className="relative">
        <button onClick={(e) => {
          e.preventDefault();
          setShowCountries(true);
        }} className="h-full">
          <div className="flex items-center">
            <Image src={selectedCountryImg} alt="country flag" width={0} height={0} className="w-5 h-5"/>
            <div className="ml-2 flex item">
              <ChevronDownIcon />
            </div>
          </div>
        </button>

        {showCountries &&
        <TapOutsideLayout onClick={() => setShowCountries(false)}>
          
          <div className="absolute z-20">
            <div className="bg-cc-background-main border border-cc-content-main/20 shadow px-2 py-4 rounded overflow-scroll overflow-x-hidden" style={{maxHeight: '50vh'}}>
              {Object.entries(countries_icons).map(([name, image], index) => (
                <CountryTile key={index} image={image} name={name} onClick={() => {
                  update(image, name)
                  pressOnChangeCountry(name);
                } 
              }/>
              ))}
            </div>
          </div>

        </TapOutsideLayout>
        }
      </div>
      
      {/* input field */}
      <div className="ml-4 w-full">
        <TextInputField
          name='phone'
          type='number'
          placeholder={'Phone number'}
          required
        />
      </div>
    </div>
  </div>
  )
}

const CountryTile = ({image, name, onClick,} : {image: string, name: string, onClick: React.MouseEventHandler<HTMLDivElement>}) => {
  const maxWordsCount = 25;
  const getName = (name: string) => {
    if (name.length > maxWordsCount) {
      return name.substring(0, maxWordsCount) + '...';
    }
    return name;
  }

  return (
    <div className="flex py-2 px-3 md:hover:bg-gray-200 rounded cursor-pointer" onClick={onClick}>
      <Image src={image} alt="country flag" className="opacity-50" width={16} height={16}/>
      <p className="whitespace-nowrap ml-5">{getName(name)}</p>
    </div>
  );
}

