import LabelAndTextInputField from "~/components/inputs/label_text_input_field";
import PopupLayout from "./_components/popup-layout";
import LabelDropdown from "~/components/inputs/label-dropdown";
import images from "~/app/core/constants/images";
import { Avatar } from "~/components/avatar-username";
import { useState } from "react";
import LabelTextareaField from "~/components/inputs/label_textarea_field";

export default function StatementForm({showPopup=true, setShowPopup} : {showPopup: boolean, setShowPopup: (v: boolean) => void}) {
  const [selectedOffender, setSelectedOffender] = useState(0);
  const offenders = [{icon: <Avatar url={images.maleAvatarDefault} size={5} />, title: 'Sunday Habakuk'}, {icon: <Avatar url={images.maleAvatarDefault} size={5} />, title: 'Gabriel Akpan'}];
  
  return (
    <>
      <PopupLayout title="Add Statement" submitButtonText="Create" maxW="3xl" setShowPopup={setShowPopup} showPopup={showPopup} zIndex={20} h="3/4">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-8">
          <LabelDropdown label="Offender" options={offenders} defaultSelectedOptionIndex={selectedOffender} updateSelected={setSelectedOffender} />
        </div>
        <div className="grid grid-cols-3 gap-8">
          <LabelAndTextInputField label="Hostel" placeholder="Enter hostel name" />
          <LabelAndTextInputField label="Block" placeholder="Enter block name" />
          <LabelAndTextInputField label="Room Number" placeholder="Enter room number" />
        </div>
        <LabelAndTextInputField label="Address" placeholder="Enter offenders address" />

        <LabelTextareaField label="Statement" placeholder="Enter offenders statement" />
      </div>
    </PopupLayout>

    </>
  )
}
