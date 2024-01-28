"use client";
import Divider from "~/components/divider";
import DropdownButton from "~/components/inputs/dropdown-button";
import Input from "~/components/inputs/input";
import { T3 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";

const Page = () => {
  return (
    <div>
      <T3>General</T3>
      <Divider className="my-5" />

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex items-end gap-2">
          <Input label="School name" />
          <Button variant={"secondary"}>Rename</Button>
        </div>

        {/* Currency */}
        <div className="flex items-end gap-2">
          <DropdownButton
            label="Currency"
            name="Currency"
            description="This is the payment currency that will be supported by this university"
            options={[]}
            updateSelected={(index) => console.log("picked", index)}
          />
          <Button variant={"secondary"}>Change</Button>
        </div>

        {/* University */}
        <div className="flex items-end gap-2">
          <DropdownButton
            label="University / College type"
            name="Type of university"
            description="This is the payment currency that will be supported by this university"
            options={[]}
            updateSelected={(index) => console.log("picked", index)}
          />
          <Button variant={"secondary"}>Change</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
