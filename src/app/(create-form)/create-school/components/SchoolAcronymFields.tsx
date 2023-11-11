'use client';

import { useState, useTransition } from "react";
import { findSchoolByName } from "../_action";
import LabelAndTextInputField from "~/app/_components/inputs/label_text_input_field";

// Both fields have some logic relating to each other
// when the school name is entered an acronym of the school name
// would be generated and inserted into the acronym input field
export default function SchoolNameAndAcronymInputFields({nameIsValid, setNameIsValid} : { nameIsValid: boolean | undefined, setNameIsValid: (value: boolean | undefined) => void}) {
  const [_, startTransition] = useTransition();
  const [isLoadingName, setIsLoadingName] = useState<boolean>();
  const [schoolName, setSchoolName] = useState<string>();

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

  function onNameChange(value?: string) {
    console.log(value);
    if (value) {
      setIsLoadingName(true);
      startTransition(() => findSchoolByName(value).then((school) => {
        if (school) setNameIsValid(false);
        else setNameIsValid(true);
        setIsLoadingName(false);
      }));
    }
  }

  return (
    <>
      <LabelAndTextInputField
        label="School name"
        name="school_name"
        placeholder="Harvard university"
        inputIsValid={nameIsValid}
        inputIsLoading={isLoadingName}
        onChange={(e) => {
          if (e.target.value === undefined || e.target.value.length === 0) setNameIsValid(undefined);
          onNameChange(e.target.value);
          setSchoolName(e.target.value);
        }}
        explanation={"This will be the name of the university/college"}
        required
      />
      <LabelAndTextInputField
        label="Acronym"
        name="acronym"
        placeholder="HVD"
        onChange={(e) => {
          // ensure the input value never exceeds length 3
          const value = e.target.value;
          setSchoolName(value.slice(0, 3));
        }}
        value={getAcronym(schoolName)}
        explanation={
          <p>
            e.g <b>HVD</b>/20/04/05/0010
          </p>
        }
        required
      />
    </>
  );
}
