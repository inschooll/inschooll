import Link from "next/link";
import { HostelCaseTypeIcon } from "~/app/core/constants/icons";

const NavHeaderItem = ({value}: {value: string}) => (
  <p className="col-span-1 text-sm font-semibold text-cc-content-main/50">
    {value}
  </p>
);

const Title = ({value} : {value: string}) => (
  <p className="font-semibold text-cc-content-sub truncate">
    {value}
  </p>
);

export function CaseTableTTO() {
  return (
    <div className="">
      {/* Nav */}
      <div className="col grid h-12 grid-cols-12 items-center border border-cc-border-main px-5">
        <NavHeaderItem value="Type" />
        <NavHeaderItem value="Title" />
        <NavHeaderItem value="Offenders" />
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
              <div className="col-span-8 pr-5">
                <Title value="Stolen laptops found with 3 Students Stolen laptops found with 3 Students" />
              </div>
              <div className="col-span-3 pr-5">
                <p className="font-semibold text-cc-content-sub/50">5</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}