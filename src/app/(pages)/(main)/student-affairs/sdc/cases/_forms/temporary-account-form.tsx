import PopupLayout from "./_components/popup-layout";
import LabelAndTextInputField from "~/components/inputs/label_text_input_field";
import LabelDropdown from "~/components/inputs/label-dropdown";
import { Avatar } from "~/components/avatar-username";
import images from "~/app/core/constants/images";
import Button from "~/components/buttons/button";
import { useState } from "react";
import CropperPopup from "~/components/cropper";

export default function TemporaryAccountForm({showPopup=true, setShowPopup} : {showPopup: boolean, setShowPopup: (v: boolean) => void}) {
  const [selectedGenderIndex, setSelectedGenderIndex] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File>();
  const [enableCropper, setEnableCropper] = useState(false);

  const faculties = [{title: 'Science & Technology'}, {title: 'Medicine'}, {title: 'Business'}, {title: 'Arts'}];
  const departments = [{title: 'Computer Science'}, {title: 'Cybersecurity'}, {title: 'Information Technology Rubbish'}];
  const genders = [{title: 'Male'}, {title: 'Female'}];

  function onClickChangeAvatar() {
    const avatarInput = document.getElementById("temp-avatar-input") as HTMLInputElement;
    avatarInput.click();

    avatarInput.addEventListener("change", function () {
      const file = avatarInput.files![0];
      new File([''], 'new');

      if (file) {
        setAvatarFile(file);
        console.log(avatarFile);
        const reader = new FileReader();

        reader.onload = function (e) {
          const image = e.target?.result as string;
          setAvatar(image);
          setEnableCropper(true);
        };

        reader.readAsDataURL(file);
      }
    });
  }

  function resetForm() {
    setSelectedGenderIndex(0);
    setAvatar('');
    setAvatarFile(undefined);
    setEnableCropper(false);
  }

  return (
    <>
      {enableCropper && <CropperPopup img={avatar} aspectRaito={1/1} cropShape="round" setNewImage={({croppedImage, file}) => {
        console.log(file);
        setAvatar(croppedImage);
        setEnableCropper(false);
      }} />}
      
      <PopupLayout title="Create Temporary Offender Account" submitButtonText="Create" maxW="3xl" setShowPopup={setShowPopup} showPopup={showPopup} zIndex={20} h="3/4" onClose={resetForm}>
        <>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <LabelAndTextInputField label="First name" placeholder="Enter first name" />
            <LabelAndTextInputField label="Last name" placeholder="Enter last name" />
            <LabelAndTextInputField label="Email" placeholder="Enter email address" />
            <LabelAndTextInputField label="Phone number" placeholder="Enter phone number" />
            <LabelDropdown label="Gender" options={genders} updateSelected={setSelectedGenderIndex} />
            <LabelAndTextInputField label="Matric number" placeholder="Enter matriculation number" />
            <LabelDropdown label="Faculty" options={faculties} />
            <LabelDropdown label="Department" options={departments} />
          </div>
          {/* <div className="grid grid-cols-2 gap-8 pt-2">
          </div> */}

          <div className="flex flex-col items-center gap-5 py-10">
            {avatar && <Avatar url={avatar} size={36} />}
            {!avatar && <Avatar url={selectedGenderIndex == 0 ? images.maleAvatarDefault : images.femaleAvatarDefault} size={36} />}

            <Button onClick={onClickChangeAvatar}>Add Profile Picture</Button>
            <input type="file" className="hidden" id="temp-avatar-input" />
          </div>
        </>
      </PopupLayout>

    </>
  )
}