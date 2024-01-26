'use client';

import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CaseTableTTBORD } from "~/app/(pages)/(main)/_components/tables/cases-tables";
import Button from "~/components/buttons/button";
import IconTextInputField from "~/components/inputs/icon_text_input_field";
import CaseForm from "../_forms/case-form";
import ScheduleHearingForm from "../_forms/schedule-hearing-form";
import Navbar from "~/components/navbar";

export function SearchInputField({ onChange, placeholder="Search" } : {onChange: (v: string) => void, placeholder?: string}) {
  return (
    <IconTextInputField onChange={(v) => onChange(v as string)} placeholder={placeholder} iconRight={<IoSearch className="text-cc-content-main/50" />} />
  )
}

export default function Body() {
  const [showCreateCaseForm, setShowCreateCaseForm] = useState(false);
  const [showScheduleHearingForm, setShowScheduleHearingForm] = useState(false);
  const navItems = ["Scheduled Hearing", "Open Cases", "Closed Cases"].map(item => ({text: item})); // rs. [{text: 'Scheduled Hearing'}, ...]
  const [, setSelectedNavItemIndex] = useState(1);

  return (
    <>
      <CaseForm showPopup={showCreateCaseForm} setShowPopup={setShowCreateCaseForm} />
      <ScheduleHearingForm showPopup={showScheduleHearingForm} setShowPopup={setShowScheduleHearingForm} />

      <div>
        <Navbar navItems={navItems} defaultSelected={1} updateSelected={setSelectedNavItemIndex} ulClassName="px-7" />
      </div>
      
      <div className="flex items-center border-b border-cc-border-main justify-between px-7 py-[10px]">
        {/* search */}
        <SearchInputField onChange={(v) => console.log(v)} placeholder="Search" />

        {/* schedule hearing, create cases */}
        <div className="flex items-center gap-10">
          <p className="font-semibold text-cc-content-main/50 hover:text-cc-content-main/80 transition duration-100 cursor-pointer" onClick={() => setShowScheduleHearingForm(true)}>Schedule Hearing</p>
          <Button onClick={() => setShowCreateCaseForm(true)}>Create Case</Button>
        </div>
      </div>

      {/* Table of cases */}
      <div className="border-t-4 border-cc-content-main/5">
        <CaseTableTTBORD />
      </div>
    </>
  );
}