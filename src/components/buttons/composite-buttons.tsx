import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import type { HTMLAttributes } from "react";
import { CgRemove } from "react-icons/cg";
import { cn } from "~/lib/utils";

export const AddButton = ({
  title = "Add",
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant={"secondary"} type="button" size={'sm'} className={cn("h-[2.375rem]", className)} {...props}>
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
    <Button className="w-[2.375rem] p-0 h-[2.375rem]" variant="secondary" type="button" {...props}>
      <CgRemove className="scale-[1.2] text-cc-content/70 hover:text-cc-content/90" />
    </Button>
  );
};
