"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/custom/data-table";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "~/components/ui/dialog";
import RightSidebarTab from "./sidebar-tab";
import ManageCoursesModal from "./manage-course-modal";

type CourseRegistrationMini = {
  id: string;
  code: string;
  credit: number;
};

const columns: ColumnDef<CourseRegistrationMini>[] = [
  {
    accessorKey: "code",
    header: "Course",
    cell: ({ row }) => (
      <p className="font-medium text-cc-content truncate">{row.getValue("code")}</p>
    ),
  },
  {
    accessorKey: "credit",
    header: "Credit unit",
    cell: ({ row }) => (
      <div className="flex items-center justify-between">
        <p className="text-cc-content/70 truncate font-medium">{row.getValue("credit")}</p>

        <div className="flex gap-2 items-center max-w-20 bg-amber-2000">          
          <div className="h-7 w-7 flex items-center justify-center rounded text-cc-content/80 hover:text-cc-content app-hover cursor-pointer">
            <IoEllipsisHorizontal size={20} />
          </div>
        </div>
      </div>
    ),
  },
];

const demoData: CourseRegistrationMini[] = [
  {
    id: crypto.randomUUID(),
    code: "CMP 311",
    credit: 5,
  },
  {
    id: crypto.randomUUID(),
    code: "BST 203",
    credit: 2,
  },
  {
    id: crypto.randomUUID(),
    code: "CMP 441",
    credit: 3,
  },
  {
    id: crypto.randomUUID(),
    code: "CMP 441",
    credit: 3,
  },
  {
    id: crypto.randomUUID(),
    code: "CMP 441",
    credit: 3,
  },
  {
    id: crypto.randomUUID(),
    code: "CMP 441",
    credit: 3,
  }
];

export default function CoursesSection() {
  const [coursesTabOpen, setCoursesTabOpen] = useState(false);
  const handleCoursesTabClick = () => setCoursesTabOpen(!coursesTabOpen);

  return (
    <>
      <RightSidebarTab
        title="Courses"
        count={5}
        onClick={handleCoursesTabClick}
        isOpen={coursesTabOpen}
      />
      {coursesTabOpen && (
        <div className="px-2">
          <DataTable className="mt-2" columns={columns} data={demoData} tableHeadClassName="h-11" tableCellClassName="py-2" />
          <Dialog>
            <DialogTrigger className="mt-4" asChild>
              <Button variant={"tertiary"} className="w-full">Manage courses</Button>
            </DialogTrigger>
            <DialogContent className="h-3/4 gap-0 rounded-lg bg-cc-background px-0 py-0 md:max-w-3xl">
              <ManageCoursesModal />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
