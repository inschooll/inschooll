import links from "~/lib/constants/links";
import BreadCrumbsAndTitle from "../../../_components/breadcrumbs-and-title";
import Body from "./_components/body";

export default function CasesPage() {
  const breadCrumbData = {
    "Student Affairs": links.studentAffairs,
    SDC: links.sdc,
    Cases: links.cases,
  };

  return (
    <>
      <BreadCrumbsAndTitle title="SDC Cases" breadCrumbData={breadCrumbData} />

      <div className="mt-5">
        <Body />
      </div>
    </>
  );
}
