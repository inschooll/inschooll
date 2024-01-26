import React from "react";
import { T4, T5 } from "~/components/texts/title";
import links from "~/app/core/constants/links";
import { CaseTableTTO } from "../_components/tables/cases-tables";
import Link from "next/link";
import BreadCrumbsAndTitle from "../_components/breadcrumbs-and-title";

export default function StudentAffairs({
  params,
}: {
  params: { school: string };
}) {
  const breadCrumbData = {'Student Affairs': links.studentAffairs(params.school)};

  return (
    <main>
      <BreadCrumbsAndTitle title="Student Affairs" breadCrumbData={breadCrumbData} />

      {/* sdc, src, right side bar */}
      <div className="mt-12 grid grid-cols-12 gap-4 px-7">
        <MainContent schoolName={params.school} />
        <RightSidebar />
      </div>
    </main>
  );
}

function MainContent({schoolName}: {schoolName: string}) {
  return (
    <div className="col-span-8">
      {/* sdc & src box */}
      <div className="grid grid-cols-8 gap-4">
        <SDCCard schoolName={schoolName} />
        <SRCCard schoolName={schoolName} />

        {/* case summary */}
        <div className="col-span-8">
          <div className="rounded-lg border-t border-x border-cc-border-main h-12 flex items-center px-5">
            <T5 weight="medium">Recent Cases</T5>
          </div>
            <CaseTableTTO />
        </div>
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="col-span-4">
      <div className="flex flex-col gap-4">
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-cc-content-main px-5 py-4">
          <T4 color="text-cc-background-main">SA News</T4>
        </div>
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-cc-content-main/80 px-5 py-4">
          <T4 color="text-cc-background-main">Recently Suspended</T4>
        </div>
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-cc-content-main/50 px-5 py-4">
          <T4 color="text-cc-background-main">Recently Expelled</T4>
        </div>
      </div>
    </div>
  );
}

function SDCCard({schoolName}: {schoolName: string}) {
  return (
    <div className="col-span-4">
      <Link href={links.sdc(schoolName)}>
        <div className="W-full app-hover h-48 cursor-pointer rounded-lg border border-cc-border-main px-5 py-4">
          <div className="flex h-full flex-col justify-between">
            <div>
              <T4>SDC</T4>
              <p className="text-cc-content-sub/50">
                Student Disciplinary Committee
              </p>
            </div>

            <div className="h-16 px-5">
              <ul>
                <li className="app-transition list-disc text-cc-content-sub/70 hover:text-cc-content-sub">
                  SDC Cases
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </div>
    
  );
}

function SRCCard({schoolName}: {schoolName: string}) {
  return (
    <div className=" col-span-4">
      <Link href={links.src(schoolName)}>
        <div className="W-full app-hover h-48 cursor-pointer rounded-lg border border-cc-border-main bg-cc-border-main/20 px-5 py-4">
          <div className="flex h-full flex-col justify-between">
            <div>
              <T4>SRC</T4>
              <p className="text-cc-content-sub/50">
                Student Representative Council
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
