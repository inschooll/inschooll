'use-client';

import PopupLayout from "../_forms/_components/popup-layout";
import LabelDropdown, { LabelCalendarDropdownButton } from "~/components/inputs/label-dropdown";
import LabelTextareaField from "~/components/inputs/label_textarea_field";
import Button2 from "~/components/buttons/button2";
import { UserTableNRDB } from "~/app/(pages)/[school]/_components/tables/user-tables";
import { T6 } from "~/components/texts/title";
import { SearchInputField } from "../_components/body";
import MemoForm from "./memo-form";
import { useState } from "react";

export default function ScheduleHearingForm({showPopup, setShowPopup} : {showPopup: boolean, setShowPopup: (v: boolean) => void}) {
  const numOfCasesOptions = [{title: 'All'}, {title: '1'}, {title: '5'}, {title: '10'}, {title: '15'}, {title: '20'}, {title: '30'}, {title: '40'}, {title: '50'}];
  const [showBoardMemberMemoForm, setShowBoardMemberMemoForm] = useState(false);
  const [showOffenderMemoForm, setShowOffenderMemoForm] = useState(false);

  return (
    <>
      <MemoForm showPopup={showBoardMemberMemoForm} setShowPopup={setShowBoardMemberMemoForm} />
      <MemoForm showPopup={showOffenderMemoForm} setShowPopup={setShowOffenderMemoForm} />
    
      <PopupLayout title="Schedule Hearing" submitButtonText="Create" setShowPopup={setShowPopup} showPopup={showPopup}>
        <>
          <div className="md:w-72 grid gap-3">
            <LabelDropdown label="Number of Cases" options={numOfCasesOptions} defaultSelectedOptionIndex={0} />
            <LabelCalendarDropdownButton label="Date of Hearing" />
          </div>
          {/* calendar */}

          <Separator my={5} />
          <BoardMembersSection setShowMemoForm={setShowBoardMemberMemoForm} />

          <Separator my={5} />
          <OffendersSection setShowMemoForm={setShowOffenderMemoForm}  />
        </>
      </PopupLayout>
    </>
  )
}

function BoardMembersSection({setShowMemoForm} : {setShowMemoForm: (v: boolean) => void}) {  
  return (
    <>
      <div className="">
        <T6 weight="medium" color="text-cc-content-main/70">Board Members</T6>
        <div className="flex justify-between items-center pt-5">
          <SearchInputField onChange={(v) => console.log(v)} placeholder="Add board members" />
          <div className="flex gap-2">
            <Button2 variant="blue">Add HODs Automatically</Button2>
            <Button2 variant="red">Remove</Button2>
          </div>
        </div>
        {/* table */}
        <div className="pt-8">
          <UserTableNRDB topRound="2xl" onClickButton={() => setShowMemoForm(true)} buttonColumnTitle="Memo" />
        </div>
        {/* general memo */}
        <div className="pt-5">
          <LabelTextareaField label="General Invitation Memo (for board members)" placeholder="Enter the message to be sent ..." rows={4} />
          <div className="flex justify-end pt-4">
            <Button2 variant="gray">Add this memo to all board members without a memo</Button2>
          </div>
        </div>
      </div>
    </>
  );
}

function OffendersSection({setShowMemoForm} : {setShowMemoForm: (v: boolean) => void}) {
  
  return (
    <>

      <div className="">
        <T6 weight="medium" color="text-cc-content-main/70">Offenders</T6>
        {/* table */}
        <div className="pt-8">
          <UserTableNRDB topRound="2xl" onClickButton={() => setShowMemoForm(true)} buttonColumnTitle="Memo" />
        </div>
        {/* general memo */}
        <div className="pt-5">
          <LabelTextareaField label="General Invitation Memo (for offenders)" placeholder="Enter the message to be sent ..." rows={4} />
          <div className="flex justify-end pt-4">
            <Button2 variant="gray">Add this memo to all offenders without a memo</Button2>
          </div>
        </div>
      </div>
    </>
  );
}


function Separator({my, mx, mt, mb} : {my?: number, mx?: number, mt?: number, mb?: number}) {
  let padding = '';
  if (my) padding += ` my-${my}`;
  if (mx) padding += ` mx-${mx}`;
  if (mt) padding += ` mt-${mt}`;
  if (mb) padding += ` mb-${mb}`;

  return (
    <div className={`w-full border-t-2 border-cc-border-main ${padding}`}></div>
  );
}