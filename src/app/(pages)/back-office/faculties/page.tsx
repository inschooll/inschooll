import Link from "next/link";
import { MdAdd } from "react-icons/md";
import Input from "~/components/inputs/input";
import { buttonVariants } from "~/components/ui/button";
import links from "~/lib/constants/links";
import { SectionTitle } from "../_components/section-title";

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
            <MdAdd size={16} />
            <p className="pl-0.5">Add faculty</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
