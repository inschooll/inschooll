import links from "~/app/core/constants/links";
import BreadCrumbsAndTitle from "../../../_components/breadcrumbs-and-title";
import Body from "./_components/body";

export default function CasesPage({ params }: { params: { school: string } }) {
  const breadCrumbData = {
    "Student Affairs": links.studentAffairs(params.school),
    SDC: links.sdc(params.school),
    Cases: links.cases(params.school),
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
