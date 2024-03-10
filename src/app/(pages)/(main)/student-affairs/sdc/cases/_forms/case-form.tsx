import { useState } from "react";
import { UserTableNRDB } from "~/app/(pages)/(main)/_components/tables/user-tables";
import Button2 from "~/components/buttons/button2";
import LabelDropdown from "~/components/inputs/label-dropdown";
import LabelAndTextInputField from "~/components/inputs/label_text_input_field";
import LabelTextareaField from "~/components/inputs/label_textarea_field";
import { T6 } from "~/components/texts/title";
import { CivilCaseTypeIcon, CriminalCaseTypeIcon, HostelCaseTypeIcon } from "~/lib/constants/icons";
import { SearchInputField } from "../_components/body";
import PopupLayout from "./_components/popup-layout";
import TemporaryAccountForm from "./temporary-account-form";
import StatementForm from "./statement-form";

export default function CaseForm({showPopup=true, setShowPopup} : {showPopup: boolean, setShowPopup: (v: boolean) => void}) {
  const caseTypes = [{icon: <CriminalCaseTypeIcon />, title: 'Criminal'}, {icon: <CivilCaseTypeIcon />, title: 'Civil'}, {icon: <HostelCaseTypeIcon />, title: 'Hostel'}];
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(2);

  const [showTemporaryAccountFormPopup, setShowTemporaryAccountFormPopup] = useState(false);
  const [showStatementFormPopup, setShowStatementFormPopup] = useState(false);

  return (
    <>
      <TemporaryAccountForm setShowPopup={setShowTemporaryAccountFormPopup} showPopup={showTemporaryAccountFormPopup} />
      <StatementForm setShowPopup={setShowStatementFormPopup} showPopup={showStatementFormPopup} />
    
      <PopupLayout title="Create Case" submitButtonText="Create" setShowPopup={setShowPopup} showPopup={showPopup}>
        <>
          <LabelAndTextInputField label="Title" placeholder="Enter the title of the case" />
          <LabelDropdown label="Type" options={caseTypes} defaultSelectedOptionIndex={selectedCaseIndex} updateSelected={setSelectedCaseIndex} />
          <LabelAndTextInputField label="Location" placeholder="Enter the location where the event took place" />
          <LabelTextareaField label="Description" placeholder="Describe what happened" />

          <div className="py-4">
            <div className="h-1 w-full border-t-2 border-cc-border-main"></div>

            <div className="pt-5">
              {/* title */}
              <T6 weight="medium" color="text-cc-content-main/70">Offenders</T6>
              {/* search <-> [buttons] */}
              <div className="flex justify-between items-center pt-5">
                <SearchInputField onChange={(v) => console.log(v)} placeholder="Add offenders" />
                <div className="flex gap-2">
                  <Button2 variant="blue" onClick={() => setShowTemporaryAccountFormPopup((true))}>Add Temporary Account</Button2>
                  <Button2 variant="red">Remove</Button2>
                </div>
              </div>

              {/* table */}
              <div className="pt-8">
                <UserTableNRDB topRound="2xl" buttonColumnTitle="Statement" onClickButton={() => setShowStatementFormPopup(true)} />
              </div>
            </div>
          </div>
        </>
      </PopupLayout>
    </>
  );
}

