import React from "react";
import { T4, T5 } from "~/components/texts/title";
import links from "~/lib/constants/links";
import Link from "next/link";
import {CaseTableTTO} from "../../_components/tables/cases-tables";
import BreadCrumbsAndTitle from "../../_components/breadcrumbs-and-title";

export default function SDCCases({
  params,
}: {
  params: { school: string };
}) {
  const breadCrumbData = {'Student Affairs': links.studentAffairs, 'SDC': links.sdc};
  return (
    <main>
      <BreadCrumbsAndTitle title="SDC" breadCrumbData={breadCrumbData} />

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
        <CaseCard />
        <EmptyCard />

        {/* case summary */}
        <div className="col-span-8">
          <div className="rounded-t-lg border-t border-x border-cc-border-main h-12 flex items-center px-5">
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
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-green-400 px-5 py-4">
          <T4 color="text-cc-background-main">Returning Students</T4>
        </div>
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-cc-content-main px-5 py-4">
          <T4 color="text-cc-background-main">Recently Suspended</T4>
        </div>
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-cc-content-main/80 px-5 py-4">
          <T4 color="text-cc-background-main">Upcoming Hearing</T4>
        </div>
        <div className="h-80 cursor-pointer rounded-lg border border-cc-border-main bg-cc-content-main/50 px-5 py-4">
          <T4 color="text-cc-background-main">Recently Suspended</T4>
        </div>
      </div>
    </div>
  );
}

function CaseCard() {
  return (
    <div className="col-span-4">
      <Link href={links.cases}>
        <div className="W-full app-hover h-48 cursor-pointer rounded-lg border border-cc-border-main px-5 py-4">
          <div className="flex h-full flex-col justify-between">
            <div>
              <T4>Cases</T4>
              <p className="text-cc-content-sub/50">
                Students who broke the schools law
              </p>
            </div>

            <div className="h-16 px-5">
              <ul>
                <li className="app-transition list-disc text-cc-content-sub/70 hover:text-cc-content-sub">
                  Resolved
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </div>
    
  );
}

function EmptyCard() {
  return (
    <div className=" col-span-4">
      <Link href={links.src}>
        <div className="W-full app-hover h-48 cursor-pointer rounded-lg border border-cc-border-main bg-cc-border-main/20 px-5 py-4">
          <div className="flex h-full flex-col justify-between">
            <div>
              <T4>---</T4>
              <p className="text-cc-content-sub/50">
              ---
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
