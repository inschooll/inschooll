"use client";
import React, { type ChangeEvent, useState, useEffect } from "react";
import Image from "next/image";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";
import Button from "~/app/_components/buttons/button";
import constants, { type monthsType } from "~/app/core/constants/constants";

import Label from "~/app/_components/inputs/label";
import DropdownButton from "~/app/_components/inputs/dropdown-button";
import { isFebruaryAndLeapYear, isPhoneNumber, useHandleError } from "~/core/utils-client";
import { api } from "~/trpc/react";
import { usePopUpStore } from "~/app/_components/popups/popup_store";
import TextInputField from "~/app/_components/inputs/text_input_field";
import images from "~/app/core/constants/images";
import validator from 'validator';
import { countries_data } from "scripts/data/countries_data";
import InfoBox from "~/app/_components/cards/InfoBox";

export default function FormBody({ setAuthToken } : {setAuthToken: (token: string) => void}) {
  // store
  const { addPopup } = usePopUpStore();
  const { handleError } = useHandleError();
  // TRPC
  const { mutate: signup, isLoading, isError } = api.auth.signup.useMutation({
    onError: (err) => {
      addPopup({text: 'Something went wrong', type: 'error'})
    },
    onSuccess: ({ authToken }) => {
      addPopup({text: 'Your Account was successfully created!', type: 'success'})
      setAuthToken(authToken);
    }
  });

  // fields
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    nationality: "",
    stateOfOrigin: "",   // if set to 'all' it means there is no state for the country
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    dob_day: 0,
    dob_month: "January" as monthsType,
    dob_year: 0,
  });

  // countries & states
  const countries = countries_data;
  const [states, setStates] = useState(countries_data[0]!.states);

  // username (verification)
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>();
  const { mutate: findUserByUsername, isLoading: usernameIsLoading, isError: usernameIsError } = api.user.getByUsername.useMutation({
    onError: (error) => {
      handleError({msg: error.message})
      setUsernameIsValid(false);
    },
    onSuccess: (data) => {
      if (!data) return setUsernameIsValid(true);  // username doesn't exist
      else setUsernameIsValid(false);  // username exists
    }
  });
  // email (verification)
  const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const { mutate: findUserByEmail, isLoading: emailIsLoading, isError: emailIsError } = api.user.getByEmail.useMutation({
    onError: (error) => {
      handleError({msg: error.message})
      setEmailIsValid(false);
    },
    onSuccess: (data) => {
      if (!data) return setEmailIsValid(true);  // Email doesn't exist
      else setEmailIsValid(false);  // Email exists
    }
  });
  
  // make username, email request only when user has not typed a character in 2 seconds
  const [shouldMakeUsernameRequest, setShouldMakeUsernameRequest] = useState(false);
  const [shouldMakeEmailRequest, setShouldMakeEmailRequest] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => setShouldMakeUsernameRequest(true), 2000);
    return () => clearTimeout(timerId);
  }, [input.username]);
  useEffect(() => {
    const timerId = setTimeout(() => setShouldMakeEmailRequest(true), 2000);
    return () => clearTimeout(timerId);
  }, [input.email]);

  useEffect(() => {
    if (shouldMakeUsernameRequest && input.username !== '' && !input.username.includes(' ')) {
      // make API request
      findUserByUsername({username: input.username});
      // Reset shouldMakeRequest
      setShouldMakeUsernameRequest(false);
    }
    if (shouldMakeEmailRequest && validator.isEmail(input.email)) {
      // make API request
      findUserByEmail({email: input.email});
      // Reset shouldMakeRequest
      setShouldMakeEmailRequest(false);
    }
  }, [shouldMakeUsernameRequest, shouldMakeEmailRequest, input.username, input.email, findUserByUsername, findUserByEmail]);

  const [stage, setStage] = useState(1);
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 100 },
    (_, index) => `${currentYear - index}`,
  );

  function formIsValid() {
    setInputErrorMessage("");

    // first name, last name
    if (!input.firstName && !input.firstName) return showTopErrorMsg("Enter your first and last name");
    if (stage === 1 && input.firstName && input.firstName) return setStage(2);

    // username
    if (input.username === '') return showTopErrorMsg("Please enter your username")
    if (!usernameIsValid) return showTopErrorMsg("Username already exists. Try something else")
    if (stage === 2 && input.username) return setStage(3);
    
    // email
    if(!validator.isEmail(input.email)) return showTopErrorMsg("Please enter a valid email")
    if (!emailIsValid) return showTopErrorMsg("Email already exists. Try something else")
    if (stage === 3 && input.email) return setStage(4);

    // password
    if (input.password.length < 6) return showTopErrorMsg("Password should be 6 or more characters long!")
    if (input.password !== input.confirmPassword) return showTopErrorMsg("Passwords do not match!")
    if (stage === 4 && input.password && input.confirmPassword) return setStage(5);

    // nationality
    if (!input.nationality) return showTopErrorMsg("Select your Nationality")
    if (!input.stateOfOrigin) return showTopErrorMsg("Select your State of Origin")
    if (stage === 5 && input.nationality && input.stateOfOrigin) return setStage(6);

    // phone number
    if (isPhoneNumber(input.phoneNumber)) return showTopErrorMsg("Please enter a valid phone number")
    if (!input.phoneNumber) return showTopErrorMsg("Please enter your Phone Number")
    if (stage === 6 && input.phoneNumber) return setStage(7);

    // gender
    if (!input.gender) return showTopErrorMsg("Please select your Gender")
    if (stage === 7 && input.gender) return setStage(8);
    
    // date of birth
    if (!input.dob_month || !input.dob_day || !input.dob_year) return showTopErrorMsg("Please enter your Date of Birth!");
    // if (stage === 8 && (input.dob_month || input.dob_day || input.dob_year)) return setStage(9)

    // form is valid
    setInputErrorMessage("");
    return true;
  }
  const showTopErrorMsg = (msg: string) => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    return setInputErrorMessage(msg)
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((data) => ({ ...data, [name]: value }));
  }

  return (
    <form>
      {!!inputErrorMessage && (<InfoBox text={inputErrorMessage} type="error" />)}

      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* first name */}
        {stage > 0 && (
          <div className="col-span-1">
            <LabelAndTextInputField
              label="first name"
              name="firstName"
              value={input.firstName}
              onChange={onChange}
              placeholder="First name"
              required
            />
          </div>
        )}
        {/* Last name */}
        {stage > 0 && (
          <div className="col-span-1">
            <LabelAndTextInputField
              label="last name"
              name="lastName"
              value={input.lastName}
              onChange={onChange}
              placeholder="Enter your last name..."
              required
            />
          </div>
        )}

        {/* username */}
        {stage > 1 && (
          <div className="col-span-2">
            <LabelAndTextInputField
              label="username"
              name="username"
              value={input.username}
              inputIsLoading={usernameIsLoading}
              inputIsValid={input.username === '' ? undefined :  usernameIsValid}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Enter your username..."
              required
            />
          </div>
        )}

        {/* email */}
        {stage > 2 && (
          <div className="col-span-2">
            <LabelAndTextInputField
              label="email"
              name="email"
              value={input.email}
              inputIsLoading={emailIsLoading}
              inputIsValid={validator.isEmail(input.email) === false ? undefined :  emailIsValid}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="email"
              required
            />
          </div>
        )}

        {/* password, confirm password */}
        {stage > 3 && (
          <div className="col-span-1">
            <LabelAndTextInputField
              label="password"
              name="password"
              type="password"
              value={input.password}
              onChange={onChange}
              placeholder="password"
              required
            />
          </div>
        )}
        {stage > 3 && (
          <div className="col-span-1">
            <LabelAndTextInputField
              label="confirm password"
              name="confirmPassword"
              type="text"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput((inputs) => ({
                  ...inputs,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="re-type password"
              required
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-4">

        {/* nationality */}
        {stage > 4 && (<div className="col-span-3">
              <Label value="Nationality" isRequired={true} />
              <div className="mt-1">
                <DropdownButton 
                  name="Nationality"
                  options={countries.map(({name}) => ({
                    icon: <Image src={images.countryFlag(name)} alt={name} height={20} width={20} />,
                    title: name,
                  }))}
                  updateSelected={(index) => {
                    setInput((data) => ({...data, stateOfOrigin: '', nationality: countries[index]!.name}))
                    // update states
                    setStates(countries[index]!.states);
                  }}
                />
              </div>
            </div>
        )}
        {/* state of origin */}
        {stage > 4 && (
          <div className="col-span-3">
            <Label value="State of Origin" isRequired={true} />
            <div className="mt-1">
              <DropdownButton 
                name={"State of origin"}
                options={states.length > 0 ? states.map(state => state.name) : [input.nationality]}
                updateSelected={(index) => {
                  setInput((data) => ({...data, stateOfOrigin: states[index]?.name ?? 'All'}))
                }}
              />
            </div>
          </div>
        )}

        {/* phone */}
        {stage > 5 && (
          <div className="col-span-3">
            <Label value="Phone number" isRequired={true} />
            <div className="mt-1">
              <TextInputField
                name="phoneNumber"
                type="text"
                value={input.phoneNumber}
                onChange={(e) =>
                  setInput((inputs) => ({
                    ...inputs,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder={"Phone number"}
                required
              />
            </div>
          </div>
        )}

        {/* gender */}
        {stage > 6 && (
          <div className="col-span-3">
            <Label
              labelFor="gender"
              className="mt-4"
              value={"Gender"}
              isRequired={true}
            />
            <div className="mt-1">
              <DropdownButton
                name="gender"
                options={constants.gender}
                defaultSelectedOptionIndex={0}
                updateSelected={(index) =>
                  setInput((inputs) => ({
                    ...inputs,
                    gender: constants.gender[index]!,
                  }))
                }
              />
            </div>
          </div>
        )}

        {/* date of birth */}
        {stage > 7 && (
          <>
            <Label value={"Date of birth"} isRequired={true} />
            <div className="grid grid-cols-3 gap-4">
              {/* month */}
              <DropdownButton
                name="month"
                options={constants.months}
                defaultSelectedOptionIndex={0}
                updateSelected={(index) => {
                  setInput((inputs) => ({
                    ...inputs,
                    dob_month: constants.months[index] as monthsType,
                  }));
                  const daysInCurrentMonth =
                    constants.daysInMonth[
                      constants.months[index] as monthsType
                    ];
                  // if chosen day number exceeds selected month days number, we set the dob_day = last day of current month
                  if (daysInCurrentMonth < input.dob_day) {
                    setInput((data) => ({
                      ...data,
                      dob_day: daysInCurrentMonth,
                    }));
                  }
                }}
              />
              {/* day */}
              <DropdownButton
                name="day"
                options={Array.from(
                  {
                    length: isFebruaryAndLeapYear(
                      input.dob_year,
                      input.dob_month,
                    )
                      ? 29
                      : constants.daysInMonth[input.dob_month],
                  },
                  (_, index) => `${index + 1}`,
                )}
                defaultSelectedOptionIndex={0}
                updateSelected={(index) =>
                  setInput((inputs) => ({ ...inputs, dob_day: index + 1 }))
                }
              />
              {/* year */}
              <DropdownButton
                name="year"
                options={years}
                defaultSelectedOptionIndex={0}
                updateSelected={(index) =>
                  setInput((inputs) => ({
                    ...inputs,
                    dob_year: parseInt(years[index]!),
                  }))
                }
              />
            </div>
          </>
        )}

        {/* sign up button */}
        <div className="mt-2">
          <Button
            variant={"defaultFull"}
            size={"md"}
            type="button"
            disabled={usernameIsLoading || emailIsLoading}
            isLoading={isLoading && !isError}
            onClick={() => {
              if (usernameIsError || emailIsError) return;
              if (usernameIsLoading || emailIsLoading) return;

              const formIsValid_ = formIsValid();
              if (formIsValid_ === true) signup(input);
            }}
          >
            {stage > 7 ? 'Sign up' : 'Proceed'}
          </Button>
        </div>
      </div>
    </form>
  );
}