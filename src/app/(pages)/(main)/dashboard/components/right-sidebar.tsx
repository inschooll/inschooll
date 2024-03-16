"use client";
import { ChevronDown, PanelRight } from "lucide-react";
import { useRightDashboardSidebarStore } from "~/store";
import DashboardCalendar from "./dashboard-calendar";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function DashboardRightSidebar() {
  const showRightSidebar = useRightDashboardSidebarStore(
    (state) => state.isActive,
  );

  if (!showRightSidebar) return <></>;

  return (
    <div className="h-screen w-[var(--right-dashboard-side-bar-width)] border-l border-cc-border">
      <SidebarTogglerContainer />
      <CalendarSection />
      <TodoSection />
      <AssignmentsSection />
      <TestsSection />
      <CoursesSection />
    </div>
  );
}

function CalendarSection() {
  const [todoTabOpen, setTodoTabOpen] = useState(false);
  const handleTodoTabClick = () => setTodoTabOpen(!todoTabOpen);

  return (
    <>
      <SidebarTab
        title="Calendar"
        onClick={handleTodoTabClick}
        isOpen={todoTabOpen}
      />
      {todoTabOpen && (
        <DashboardCalendar className="border-b border-cc-border pb-2" />
      )}
    </>
  );
}

function TodoSection() {
  const [todoTabOpen, setTodoTabOpen] = useState(false);
  const handleTodoTabClick = () => setTodoTabOpen(!todoTabOpen);

  return (
    <>
      <SidebarTab
        title="Todo"
        count={5}
        onClick={handleTodoTabClick}
        isOpen={todoTabOpen}
      />
      {todoTabOpen && <div className="">todos is open</div>}
    </>
  );
}

function AssignmentsSection() {
  const [assignmentsTabOpen, setAssignmentTabOpen] = useState(false);
  const handleAssignmentsTabClick = () =>
    setAssignmentTabOpen(!assignmentsTabOpen);

  return (
    <>
      <SidebarTab
        title="Assignments"
        count={2}
        onClick={handleAssignmentsTabClick}
        isOpen={assignmentsTabOpen}
      />
      {assignmentsTabOpen && <div className="">assignments is open</div>}
    </>
  );
}

function TestsSection() {
  const [testsTabOpen, setTestsTabOpen] = useState(false);
  const handleTestsTabClick = () => setTestsTabOpen(!testsTabOpen);

  return (
    <>
      <SidebarTab
        title="Tests"
        count={8}
        onClick={handleTestsTabClick}
        isOpen={testsTabOpen}
      />
      {testsTabOpen && <div className="">tests is open</div>}
    </>
  );
}

function CoursesSection() {
  const [coursesTabOpen, setCoursesTabOpen] = useState(false);
  const handleCoursesTabClick = () => setCoursesTabOpen(!coursesTabOpen);

  return (
    <>
      <SidebarTab
        title="Courses"
        count={5}
        onClick={handleCoursesTabClick}
        isOpen={coursesTabOpen}
      />
      {coursesTabOpen && (
        <div className="">
          Table #LearnNoTime
          {/* Modal toggler */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>Manage courses</Button>
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

function ManageCoursesModal() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Manage Courses</DialogTitle>
      </DialogHeader>
      <ScrollArea>
        {/* Note */}
        <div className="border border-amber-400 bg-amber-400/50 px-5 py-3 ">
          <p className="">
            <span className="font-medium">Note:</span>It is important to
            register courses you’ll be taking for a semester. So as to be able
            to get graded for the semester on the particular course.
          </p>
        </div>
        <div className="space-y-5 px-5">
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

            <p>TABLE #TOBEIMPLEMENTED</p>

            <Button variant={"tertiary"} className="w-full">
              Register courses
            </Button>
          </div>
          {/* Available courses */}
          <div className="space-y-4">
            <TitleAndDescription
              title="Available courses"
              description="This are the courses available to you for the semester, you can decide to click add on the ones you would like to take for the semester"
            />

            <p>TABLE #TOBEIMPLEMENTED</p>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

type TitleAndDescriptionProps = { title: string; description: string };

function TitleAndDescription({ title, description }: TitleAndDescriptionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <p className="text-cc-content/70">{description}</p>
    </div>
  );
}

type SidebarTabProp = {
  title: string;
  count?: number;
  isOpen: boolean;
  onClick: () => void;
};

function SidebarTab({ title, count, onClick, isOpen }: SidebarTabProp) {
  return (
    <div
      className={cn(
        "app-hover-slight flex cursor-pointer select-none items-center justify-between p-3",
        { "border-b border-cc-border": !isOpen },
      )}
      onClick={onClick}
    >
      <p>{title}</p>
      <div className="flex items-center gap-2">
        {!!count && <Pill className="">{count}</Pill>}
        <ChevronDown size={16} />
      </div>
    </div>
  );
}

type PillProps = {
  children: React.ReactNode;
  className: string;
};

function Pill({ children, className }: PillProps) {
  return (
    <div
      className={cn(
        "flex h-5 items-center rounded-lg bg-[#F04842] px-2 text-xs font-semibold text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SidebarTogglerContainer() {
  return (
    <div className="h-[3.25rem]] flex items-center justify-end pl-2 pr-4 pt-[0.875rem]">
      <RightDashboardSidebarToggleButton />
    </div>
  );
}

export function RightDashboardSidebarToggleButton() {
  const setIsActive = useRightDashboardSidebarStore(
    (state) => state.setIsActive,
  );
  const isActive = useRightDashboardSidebarStore((state) => state.isActive);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <PanelRight
      className="cursor-pointer text-cc-content/70 transition duration-200 hover:text-cc-content"
      onClick={handleClick}
    />
  );
}
