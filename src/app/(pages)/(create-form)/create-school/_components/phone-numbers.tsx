import { Plus } from "lucide-react";
import { useState } from "react";
import { CgRemove } from "react-icons/cg";
import Input, { InputLabel } from "~/components/inputs/input";
import { Button } from "~/components/ui/button";


export default function PhoneNumbers() {
  const [numbers, setNumbers] = useState<string[]>([""]);

  const addNewField = () => {
    setNumbers((fields) => [...fields, ""]);
  };

  const removeFieldAt = (i: number) => {
    setNumbers((prevNumbers) => {
      const updatedFields = [
        ...prevNumbers.slice(0, i),
        ...prevNumbers.slice(i + 1),
      ];
      return updatedFields;
    });
  };

  const updateNumber = (phoneNumber: string, i: number) => {
    console.log("Update Number: ✅");
    const newNumbers = [...numbers];
    newNumbers[i] = phoneNumber;
    setNumbers(newNumbers);
  };

  return (
    <div>
      <InputLabel
        label="Phone numbers"
        description="The official phone numbers of the school"
      />
      <div className="space-y-2">
        {numbers.map((item, i) => (
          <PhoneNumberItem
            key={i}
            value={numbers[i] ?? ""}
            onChange={(phoneNumber) => updateNumber(phoneNumber, i)}
            onRemoveClick={() => removeFieldAt(i)}
          />
        ))}
      </div>
      <Button
        className="mt-3"
        variant={"secondary"}
        type="button"
        onClick={addNewField}
      > 
      <div className="flex items-center space-x-1">
        <Plus size={18} />
        <span>Add another</span>
      </div>
      </Button>
    </div>
  );
}


function PhoneNumberItem(props: {
  value: string;
  onChange: (t: string) => void;
  onRemoveClick: () => void;
}) {
  return (
    <div className="flex gap-2">
      {/* input */}
      <Input
        className="h-11 w-full max-w-48"
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