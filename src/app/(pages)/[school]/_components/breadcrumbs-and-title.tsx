import { T4 } from "~/app/_components/texts/title";
import BreadCrumbs from "./breadcrumbs";

export default function BreadCrumbsAndTitle({ title, breadCrumbData }: { title: string, breadCrumbData: Record<string, string>}) {

  return (
    <div className="px-7">
      {/* Bread crumbs */}
      <BreadCrumbs patterns={breadCrumbData} />

      {/* Title */}
      <div className="mt-4">
        <T4 weight="semibold">{title}</T4>
      </div>
    </div>
  );
}