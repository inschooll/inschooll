import { T4 } from "~/components/texts/title";
import BreadCrumbs from "./breadcrumbs";

export default function BreadCrumbsAndTitle({ title, breadCrumbData }: { title: string, breadCrumbData: Record<string, string>}) {

  return (
    <>
      {/* Bread crumbs */}
      <div className="px-2">
        <BreadCrumbs patterns={breadCrumbData} />
      </div>

      <div className="px-7">
        {/* Title */}
        <div className="mt-4">
          <T4 weight="semibold">{title}</T4>
        </div>
      </div>
    </>
  );
}