"use client";
import React from "react";
import Image from "next/image";
import type { RouterOutputs } from "~/trpc/shared";
import { api } from "~/trpc/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SyncLoader } from "react-spinners";
import TextInputField from "~/app/_components/inputs/text_input_field";
import Button from "~/app/_components/buttons/button";

type schoolType = RouterOutputs["school"]["getAll"][0];

const fetchLimit = 6;

export default function PickUniversityBody({
  initialSchools,
}: {
  initialSchools: schoolType[];
}) {
  const searchRef = React.useRef;
  const [selectedSchool, setSelectedSchool] = React.useState<schoolType>();
  const [page, setPage] = React.useState(1);
  const [schools, setSchools] = React.useState(initialSchools);
  const {refetch} = api.school.getAll.useQuery({ limit: fetchLimit, skip: page });

  async function refetchData() {
    await refetch().then(({data}) => {
      // alert(`Page: ${page}`)
      // alert(data);
      if (data && data?.length > 0) {
        setSchools([...schools, ...data])
        setPage(page + 1);
      };
    });
  }
  

  return (
    <>
      {/* Navbar */}
      <div className="mt-7 flex items-center justify-between">
        <div className="grid grid-cols-5 sm:w-[400px]">
          <div className="col-span-2">
            {/* Country and Icon */}
            <p className="text-cc-content-main/50">All</p>
          </div>
        </div>

        <div>
          <TextInputField
            ref={searchRef}
            name="search"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      {/* schools list */}
      <InfiniteScroll
        dataLength={schools.length}
        next={refetchData}
        hasMore={schools.length % fetchLimit === 0}
        loader={<AppSpinner />}
      >
        <div className="mt-10 grid gap-3 pb-20 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((school, index) => (
            <UniversityCard
              key={index}
              isSelected={school === selectedSchool}
              onClick={() => setSelectedSchool(school)}
              school={school}
            />
          ))}
        </div>
      </InfiniteScroll>

      {/* Button */}
      {selectedSchool && (
        <div className="relative">
          <div className="fixed bottom-5 right-10 sm:right-52">
            <Button variant={"defaultFull"} size={"md"}>
              Yes, I am a member of this university
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function AppSpinner() {
  return (
    <div className="flex justify-center ">
      <div className="h-10 w-10">
        <SyncLoader
          color={"rgb(230,230,230)"}
          size={8}
        />
      </div>
    </div>
  );
}

interface UniversityCardProp {
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  school: schoolType;
}

const UniversityCard = ({
  isSelected,
  onClick,
  school,
}: UniversityCardProp) => {
  return (
    <div
      className="rounded-lg border-[1px] box-border mx-1"
      style={
        isSelected
          ? { boxShadow: "0 0 1px 2px #C3DEFF", borderColor: "#54A0FF" }
          : {}
      }
    >
      <div
        className="cursor-pointer rounded-lg border-[1px] border-cc-border-main px-4 py-5 text-center"
        onClick={onClick}
      >
        {/* Logo */}
        <div className="flex h-28 items-center justify-center">
          <Image
            src={school.logoUrl}
            alt="school logo"
            width={70}
            height={70}
          />
        </div>
        {/* School name */}
        <div className="mt-4">
          <h3
            title={school.name ?? ""}
            className="truncate text-xl font-bold text-cc-content-main/90"
          >
            {school.name}
          </h3>
        </div>
        {/* motto */}
        <div className="mt-2">
          <p
            className="truncate text-[15px] font-semibold text-cc-content-main/40"
            title={school.motto ?? ""}
          >
            {school.motto}
          </p>
        </div>

        {/* images */}
        <div className="mt-5 grid h-16 grid-cols-3 gap-1 overflow-hidden rounded-t sm:h-20">
          <Image
            src={school.coverUrl}
            alt="school image"
            width={1000}
            height={1000}
            style={{ width: "100%" }}
            className="h-full w-full object-cover"
          />
          <Image
            src={school.coverUrl}
            alt="school image"
            width={1000}
            height={1000}
            style={{ width: "100%" }}
            className="h-full w-full object-cover"
          />
          <Image
            src={school.coverUrl}
            alt="school image"
            width={1000}
            height={1000}
            style={{ width: "100%" }}
            className="h-full w-full object-cover"
          />
        </div>
        {/* location */}
        <div className="mt-4">
          <p className="text-[15px] text-cc-content-main/50">
            {school.address}
          </p>
        </div>
      </div>
    </div>
  );
};
