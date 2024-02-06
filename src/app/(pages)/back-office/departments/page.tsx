import Link from "next/link";
import links from "~/app/core/constants/links";
import Input from "~/components/inputs/input";
import { SectionTitle } from "../_components/section-title";
import { buttonVariants } from "~/components/ui/button";
import { MdAdd } from "react-icons/md";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Departments" variant="lg" />

      {/* Search <-> Add degree and co */}
      <div className="mt-1 flex justify-between">
        <Input />

        <div className="flex gap-2">
          <Link
            href={links.backoffice.departments.create}
            className={buttonVariants({ variant: "default" })}
          >
            <MdAdd size={16} />
            <p className="pl-0.5">Add department</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
