"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "~/components/avatar-username";
import Divider from "~/components/divider";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/custom/data-table";
import { DialogHeader } from "~/components/ui/dialog";
import images from "~/lib/constants/images";
import TitleAndDescription from "./text-and-description";

type CourseUser = { avatar: string; name: string };
type Course = {
  code: string;
  title: string;
  lecturer: CourseUser;
  credit: number;
};

const registeredCoursesDemoData: Course[] = [
  {
    code: "CMP 311",
    title: "History of Computers",
    lecturer: { avatar: images.maleAvatarDefault, name: "Barka fori" },
    credit: 3,
  },
  {
    code: "CMP 201",
    title: "Compiler Construction",
    lecturer: { avatar: images.maleAvatarDefault, name: "Barka fori" },
    credit: 3,
  },
];

const unregisteredCoursesDemoData: Course[] = [
  {
    code: "CMP 413",
    title: "Software Engineering II",
    lecturer: { avatar: images.maleAvatarDefault, name: "Barka fori" },
    credit: 3,
  },
  {
    code: "CMP 407",
    title: "Artificial Intelligence",
    lecturer: { avatar: images.maleAvatarDefault, name: "Barka fori" },
    credit: 3,
  },
];

const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => {
      return (
        <p className="font-medium text-cc-content">{row.getValue("code")}</p>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <p className="font-medium text-cc-content">{row.getValue("title")}</p>
      );
    },
  },
  {
    accessorKey: "lecturer",
    header: "lecturer",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar url={(row.getValue("lecturer") satisfies CourseUser).avatar} />
          <p className="font-medium text-cc-content/70">
            {(row.getValue("lecturer") satisfies CourseUser).name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "credit",
    header: "Credit",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <p className="font-medium text-cc-content/70">
            {row.getValue("credit")}
          </p>
          <Button variant={"secondary"} className="h-6 px-2 text-green-800 border border-green-800 bg-green-800/5" >Added</Button>
        </div>
      );
    },
  },
];

export default function ManageCoursesModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Manage Courses</DialogTitle>
      </DialogHeader>
      <div className="overflow-auto">
        {/* Note */}
        <div className="border border-amber-400 bg-yellow-500/40 px-5 py-5 ">
          <p className="">
            <span className="font-medium">Note:</span> It is important to register for courses you will be taking for a semester so that you can receive grades for those courses at the end of the semester.
          </p>
        </div>
        <div className="space-y-5 px-5 pb-20">
          {/* Requirements */}
          <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded border border-cc-border p-3 md:flex-row">
            <p className="font-medium">Requirements</p>
            <div className="space-x-4">
              <Button variant={"secondary"}>Minimum credit unit: 18</Button>
              <Button variant={"secondary"}>Maximum credit unit: 24</Button>
            </div>
          </div>

          {/* My courses */}
          <div className="space-y-4">
            <TitleAndDescription
              title="My courses"
              description="This are the courses you'll be taking for the semester"
            />

            <DataTable
              className="mt-2"
              columns={columns}
              data={registeredCoursesDemoData}
              tableHeadClassName="h-11"
              tableCellClassName="py-2"
            />

            <Button variant={"tertiary"} className="w-full">
              Register courses
            </Button>
          </div>

          <Divider />

          {/* Available courses */}
          <div className="space-y-4">
            <TitleAndDescription
              title="Available courses"
              description="This are the courses available to you for the semester, you can decide to click add on the ones you would like to take for the semester"
            />

            <DataTable
              className="mt-2"
              columns={columns}
              data={unregisteredCoursesDemoData}
              tableHeadClassName="h-11"
              tableCellClassName="py-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
