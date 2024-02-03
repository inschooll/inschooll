import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import links from "~/app/core/constants/links";
import Input from "~/components/inputs/input";
import { SectionTitle } from "../_components/section-title";
import { buttonVariants } from "~/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Faculties" variant="lg" />

      {/* Search <-> Add degree and co */}
      <div className="mt-1 flex justify-between">
        <Input />

        <div className="flex gap-2">
          <Link
            href={links.backoffice.faculties.create}
            className={buttonVariants({ variant: "default" })}
          >
            <IoMdAdd size={20} />
            <p className="pl-2">Add faculty</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
