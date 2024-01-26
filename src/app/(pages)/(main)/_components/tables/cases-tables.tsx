import Link from "next/link";
import { HostelCaseTypeIcon } from "~/app/core/constants/icons";
import { TableHeaderItem, TableItem, TableTitle } from "./components";
import links from "~/app/core/constants/links";

// Type, Title, Offenders
export function CaseTableTTO() {
  return (
    <div className="">
      {/* Nav */}
      <div className="col grid h-12 grid-cols-12 items-center border border-cc-border-main px-5">
        <TableHeaderItem value="Type" />
        <TableHeaderItem value="Title" colSpan={8} />
        <TableHeaderItem value="Offenders" colSpan={3} />
      </div>
      {/* Body */}
      <div>
        {[1, 2, 3].map((item) => (
          <Link href={''} key={item}>
            <div
              key={item}
              className="col grid h-12 grid-cols-12 items-center border-x border-b border-cc-border-main px-5 app-hover"
            >
              <div className="col-span-1 justify-center pl-2">
                {/* <CriminalCaseTypeIcon /> */}
                {/* <CivilCaseTypeIcon /> */}
                <HostelCaseTypeIcon />
              </div>
              <TableTitle value="Stolen laptops found with 3 Students Stolen laptops found with 3 Students" colSpan={8} />
              <TableItem value="3" colSpan={3}/>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Type, Title, Body, Offenders, ReportedBy, Date Added
export function CaseTableTTBORD() {
  return (
    <div className="">
      {/* Nav */}
      <div className="col grid h-12 grid-cols-12 items-center border border-cc-border-main px-5">
        <div className="pl-3">
          <TableHeaderItem value="Type" />
        </div>
        <TableHeaderItem value="Title" colSpan={4} />
        <TableHeaderItem value="Body" colSpan={2} />
        <TableHeaderItem value="Offenders" colSpan={1} />
        <TableHeaderItem value="Reported By" colSpan={2} />
        <TableHeaderItem value="Date Added" colSpan={2} />
      </div>
      {/* Body */}
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
          <Link href={links.caseWithId(`${item}`)} key={item}>
            <div
              key={item}
              className="col grid h-12 grid-cols-12 items-center border-x border-b border-cc-border-main px-5 app-hover"
            >
              <div className="col-span-1 justify-center pl-5">
                {/* <CriminalCaseTypeIcon /> */}
                {/* <CivilCaseTypeIcon /> */}
                <HostelCaseTypeIcon />
              </div>

              <TableTitle value="Stolen laptops found with 3 Students Stolen laptops found with 3 Students" colSpan={4} />
              <TableItem value="I found 5 students who complained of a missing laptop that we were later able to find" colSpan={2}/>
              <TableItem value="3" colSpan={1}/>
              <TableItem value="Mr. Yahaya adamu" colSpan={2}/>
              <TableItem value="11th Nov 2024" colSpan={2}/>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}