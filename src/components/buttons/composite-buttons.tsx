import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import type { HTMLAttributes } from "react";
import { CgRemove } from "react-icons/cg";

export const AddButton = ({
  title = "Add",
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant={"secondary"} type="button" {...props}>
      <div className="flex items-center space-x-1">
        <Plus size={18} />
        <span>{title}</span>
      </div>
    </Button>
  );
};
export const RemoveButton = ({
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button className="w-10 p-0" variant="secondary" type="button" {...props}>
      <CgRemove className="scale-[1.2] text-cc-content/70 hover:text-cc-content/90" />
    </Button>
  );
};
