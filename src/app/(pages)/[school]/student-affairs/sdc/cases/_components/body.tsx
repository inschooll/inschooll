'use client';

import { IoSearch } from "react-icons/io5";
import Button from "~/app/_components/buttons/button";
import IconTextInputField from "~/app/_components/inputs/icon_text_input_field";

export default function Body() {
  return (
    <div className="flex items-center justify-between px-7 py-3 border-b border-cc-border-main">
          {/* search */}
          <div>
            <IconTextInputField onChange={(v) => console.log(v)} placeholder="Search" iconRight={<IoSearch className="text-cc-content-main/50" />} />
          </div>
          {/* schedule hearing, create cases */}
          <div className="flex items-center gap-2">
            <p>Schedule Hearing</p>
            <Button>Create Case</Button>
          </div>
        </div>
  );
}