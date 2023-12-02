import React from "react";
import BreadCrumbsAndTitle from "../../../_components/breadcrumbs-and-title";
import links from "~/app/core/constants/links";
import CaseNavbar from "./_components/CaseNavbar";
import Body from "./_components/body";

export default function CasesPage({ params }: { params: { school: string } }) {
  const breadCrumbData = {
    "Student Affairs": links.studentAffairs(params.school),
    SDC: links.sdc(params.school),
    Cases: links.cases(params.school),
  };

  return (
    <main>
      <BreadCrumbsAndTitle title="SDC Cases" breadCrumbData={breadCrumbData} />

      <div className="mt-5">
        <CaseNavbar />
        <Body />

      </div>
    </main>
  );
}
