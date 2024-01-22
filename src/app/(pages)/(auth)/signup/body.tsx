"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import constants, { type monthsType } from "~/app/core/constants/constants";
import Button from "~/components/buttons/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { countries_data } from "scripts/data/countries_data";
import images from "~/app/core/constants/images";
import DropdownButton from "~/components/inputs/dropdown-button";
import Input, { InputErrorMessage } from "~/components/inputs/input";
import Label from "~/components/inputs/label";
import { usePopUpStore } from "~/components/popups/popup_store";
import { isFebruaryAndLeapYear, useHandleError } from "~/core/utils-client";
import { SignupSchema, type TSignupSchema } from "~/lib/types";
import { api } from "~/trpc/react";
import { z } from "zod";
import InfoBox from "~/components/cards/InfoBox";


export default function FormBody({
  setAuthToken,
}: {
  setAuthToken: (token: string) => Promise<void>;
}) {
  const methods = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });
  const formData = methods.getValues();
  const watch = methods.watch();
  const zodEmail = z.string().email();

  // store
  const { addPopup } = usePopUpStore();
  const { handleError } = useHandleError();

  // countries & states
  const countries = countries_data;
  const [states, setStates] = useState(countries_data[0]!.states);

  const {
    mutate: signup,
    isLoading,
    isError,
  } = api.auth.signup.useMutation({
    onError: (err) => {
      console.log(err);
      addPopup({ text: "Something went wrong", type: "error" });
    },
    onSuccess: async ({ authToken }) => {
      addPopup({
        text: "Your Account was successfully created!",
        type: "success",
      });
      await setAuthToken(authToken);
    },
  });

  // username (verification)
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>();
  const { mutate: findUserByUsername, isLoading: usernameIsLoading } =
    api.user.getByUsername.useMutation({
      onError: (error) => {
        methods.setError('username', {message: 'Username already exists!'});
        setUsernameIsValid(false);
        handleError({ msg: error.message });
      },
      onSuccess: (data) => {
        if (!data)
          return setUsernameIsValid(true); // username doesn't exist
        else setUsernameIsValid(false); // username exists
      },
    });

  // email (verification)
  const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const { mutate: findUserByEmail, isLoading: emailIsLoading } =
    api.user.getByEmail.useMutation({
      onError: (error) => {
        methods.setError('email', {message: 'Email already exists!'});
        setEmailIsValid(false);
        handleError({ msg: error.message });
      },
      onSuccess: (data) => {
        if (!data) {
          return setEmailIsValid(true); // Email doesn't exist
        }
        else setEmailIsValid(false); // Email exists
      },
    });

  // make username, email request only when user has not typed a character in 2 seconds
  const [shouldMakeUsernameRequest, setShouldMakeUsernameRequest] =
    useState(false);
  const [shouldMakeEmailRequest, setShouldMakeEmailRequest] = useState(false);

  useEffect(() => {
    setUsernameIsValid(undefined);
    const timerId = setTimeout(() => setShouldMakeUsernameRequest(true), 2000);
    return () => clearTimeout(timerId);
  }, [watch.username]);

  useEffect(() => {
    setEmailIsValid(undefined);
    const timerId = setTimeout(() => setShouldMakeEmailRequest(true), 2000);
    return () => clearTimeout(timerId);
  }, [watch.email]);

  useEffect(() => {
    if (
      shouldMakeUsernameRequest &&
      formData.username !== "" &&
      !formData.username.includes(" ")
    ) {
      // make API request
      findUserByUsername({ username: formData.username });
      // Reset shouldMakeRequest
      setShouldMakeUsernameRequest(false);
    }
    if (shouldMakeEmailRequest && zodEmail.safeParse(formData.email).success) {
      // make API request
      findUserByEmail({ email: formData.email });
      // Reset shouldMakeRequest
      setShouldMakeEmailRequest(false);
    }
  }, [shouldMakeUsernameRequest, shouldMakeEmailRequest, formData.username, formData.email, findUserByUsername, findUserByEmail, zodEmail]);

  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 100 },
    (_, index) => `${currentYear - index}`,
  );

  const showErrorText = (msg: string | undefined) => {
    if (msg === undefined) return undefined;

    return (<InputErrorMessage value={msg} />);
  }

  // displays an error container with a message at the top of the form
  const showError = (msg: string) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    return setInputErrorMessage(msg)
  }
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => {
        if (!usernameIsValid) return showError('Please enter a valid username');
        if (!emailIsValid) return showError('Please enter a valid email');

        signup(data);
      })}>
        {!!inputErrorMessage && (<InfoBox text={inputErrorMessage} type="error" />)}

        <div className="mt-5 grid grid-cols-2 gap-4">
          {/* first name */}
          <div className="col-span-1">
            <Input
              label="first name"
              name="firstName"
              placeholder="First name"
            />
          </div>
          {/* Last name */}

          <div className="col-span-1">
            <Input
              label="last name"
              name="lastName"
              placeholder="Enter your last name..."
            />
          </div>

          {/* username */}
          <div className="col-span-2">
            <Input
              label="username"
              name="username"
              isLoading={usernameIsLoading}
              isValid={formData.username === "" ? undefined : usernameIsValid}
              placeholder="Enter your username..."
            />
          </div>

          {/* email */}
          <div className="col-span-2">
            <Input
              label="email"
              name="email"
              isLoading={emailIsLoading}
              isValid={
                zodEmail.safeParse(formData.email).success === false
                  ? undefined
                  : emailIsValid
              }
              placeholder="email"
            />
          </div>

          {/* password, confirm password */}
          <div className="col-span-1">
            <Input
              label="password"
              name="password"
              type="password"
              placeholder="password"
            />
          </div>

          <div className="col-span-1">
            <Input
              label="confirm password"
              name="confirmPassword"
              type="text"
              placeholder="re-type password"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {/* nationality */}
          <div className="col-span-3">
            <Label value="Nationality" isRequired={true} />
            <div className="mt-1">
              <DropdownButton
                name="Nationality"
                options={countries.map(({ name }) => ({
                  icon: (
                    <Image
                      src={images.countryFlag(name)}
                      alt={name}
                      height={20}
                      width={20}
                    />
                  ),
                  title: name,
                }))}
                updateSelected={(index) => {
                  methods.setValue("stateOfOrigin", "");
                  methods.setValue("nationality", countries[index]!.name);
                  // update states
                  setStates(countries[index]!.states);
                }}
              />
              {showErrorText(methods.formState.errors.nationality?.message)}
            </div>
          </div>
          {/* state of origin */}
          <div className="col-span-3">
            <Label value="State of Origin" isRequired={true} />
            <div className="mt-1">
              <DropdownButton
                name={"State of origin"}
                options={
                  states.length > 0
                    ? states.map((state) => state.name)
                    : [formData.nationality]
                }
                updateSelected={(index) => {
                  methods.setValue(
                    "stateOfOrigin",
                    states[index]?.name ?? "All",
                  );
                }}
              />
              {showErrorText(methods.formState.errors.stateOfOrigin?.message)}
            </div>
          </div>

          {/* phone */}
          <div className="col-span-3">
              <Input
                name="phoneNumber"
                type="text"
                label="Phone number"
                placeholder={"Phone number"}
              />
          </div>

          {/* gender */}
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
                  methods.setValue("gender", constants.gender[index] ?? "male")
                }
              />
              {showErrorText(methods.formState.errors.gender?.message)}
            </div>
          </div>

          {/* date of birth */}
          <>
            <Label value={"Date of birth"} isRequired={true} />
            <div className="grid grid-cols-3 gap-4">
              {/* month */}
              <div>
                <DropdownButton
                  name="month"
                  options={constants.months as unknown as string[]}
                  defaultSelectedOptionIndex={0}
                  updateSelected={(index) => {
                    methods.setValue(
                      "dob_month",
                      constants.months[index] as monthsType & undefined,
                    );
                    const daysInCurrentMonth =
                      constants.daysInMonth[
                        constants.months[index] as monthsType & undefined
                      ];
                    // if chosen day number exceeds selected month days number, we set the dob_day = last day of current month
                    if (daysInCurrentMonth < formData.dob_day) {
                      methods.setValue("dob_day", daysInCurrentMonth);
                    }
                  }}
                />
                {showErrorText(methods.formState.errors.dob_month?.message)}
              </div>

              {/* day */}
              <div>
                <DropdownButton
                  name="day"
                  options={Array.from(
                    {
                      length: isFebruaryAndLeapYear(
                        formData.dob_year,
                        formData.dob_month,
                      )
                        ? 29
                        : constants.daysInMonth[formData.dob_month],
                    },
                    (_, index) => `${index + 1}`,
                  )}
                  defaultSelectedOptionIndex={0}
                  updateSelected={(index) =>
                    methods.setValue("dob_day", index + 1)
                  }
                />
                {showErrorText(methods.formState.errors.dob_day?.message)}
              </div>

              {/* year */}
              <div>
                <DropdownButton
                  name="year"
                  options={years}
                  defaultSelectedOptionIndex={0}
                  updateSelected={(index) =>
                    methods.setValue("dob_year", parseInt(years[index]!))
                  }
                />
                {showErrorText(methods.formState.errors.dob_year?.message)}
              </div>
            </div>
          </>

          {/* sign up button */}
          <div className="mt-2">
            <Button
              variant={"defaultFull"}
              size={"md"}
              type="submit"
              disabled={usernameIsLoading || emailIsLoading}
              isLoading={isLoading && !isError}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
