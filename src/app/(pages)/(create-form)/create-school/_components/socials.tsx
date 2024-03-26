import { useState } from "react";
import { CgRemove } from "react-icons/cg";
import { AddButton } from "~/components/buttons/composite-buttons";
import Input, { LabelAndDescription } from "~/components/inputs/input";
import { Button } from "~/components/ui/button";


export default function Socials() {
  const [socials, setSocials] = useState<string[]>([""]);

  const addNewField = () => {
    setSocials((fields) => [...fields, ""]);
  };

  const removeFieldAt = (i: number) => {
    setSocials((prevSocials) => {
      const newFields = [
        ...prevSocials.slice(0, i),
        ...prevSocials.slice(i + 1),
      ];
      return newFields;
    });
  };

  const updateSocialField = (socialHandle: string, i: number) => {
    console.log("Update Number: ✅");
    const newSocials = [...socials];
    newSocials[i] = socialHandle;
    setSocials(newSocials);
  };

  return (
    <div>
      <LabelAndDescription
        label="Socials"
        description="The different social medias of the school"
      />
      <div className="space-y-2">
        {socials.map((item, i) => (
          <SocialItem
            key={i}
            value={socials[i] ?? ""}
            onChange={(phoneNumber) => updateSocialField(phoneNumber, i)}
            onRemoveClick={() => removeFieldAt(i)}
          />
        ))}
      </div>
      <AddButton className="mt-3" title="Add another" onClick={addNewField} />
    </div>
  );
}

function SocialItem(props: {
  value: string;
  onChange: (t: string) => void;
  onRemoveClick: () => void;
}) {
  return (
    <div className="flex gap-2">
      {/* input */}
      <Input
        className="h-11 w-full md:w-72"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />

      {/* Remove button */}
      <Button
        className="h-11 w-11"
        variant="secondary"
        type="button"
        onClick={props.onRemoveClick}
      >
        <CgRemove className="scale-[1.8] text-cc-content/70 hover:text-cc-content/90" />
      </Button>
    </div>
  );
}