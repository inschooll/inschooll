import PopupLayout from "./_components/popup-layout";
import LabelDropdown from "~/app/_components/inputs/label-dropdown";
import images from "~/app/core/constants/images";
import { Avatar } from "~/app/_components/avatar-username";
import { useState } from "react";
import LabelTextareaField from "~/app/_components/inputs/label_textarea_field";

export default function MemoForm({showPopup=true, setShowPopup} : {showPopup: boolean, setShowPopup: (v: boolean) => void}) {
  const [selectedOffender, setSelectedOffender] = useState(0);
  const offenders = [{icon: <Avatar url={images.maleAvatarDefault} size={5} />, title: 'Sunday Habakuk'}, {icon: <Avatar url={images.maleAvatarDefault} size={5} />, title: 'Gabriel Akpan'}];
  
  return (
    <>
      <PopupLayout title="Add Custom Memo" submitButtonText="Create" maxW="3xl" setShowPopup={setShowPopup} showPopup={showPopup} zIndex={20}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-8">
          <LabelDropdown label="Offender" options={offenders} defaultSelectedOptionIndex={selectedOffender} updateSelected={setSelectedOffender} />
        </div>
        
        <LabelTextareaField label="Memo" placeholder="Enter memo text here ..." />
      </div>
    </PopupLayout>

    </>
  )
}
