"use client";
import { ChevronDown, PanelRight } from "lucide-react";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { useRightDashboardSidebarStore } from "~/store";
import DashboardCalendar from "./dashboard-calendar";
import CoursesSection from "./right-sidebar-components/couses-section";
import RightSidebarTab from "./right-sidebar-components/sidebar-tab";

export default function DashboardRightSidebar() {
  const showRightSidebar = useRightDashboardSidebarStore(
    (state) => state.isActive,
  );

  if (!showRightSidebar) return <></>;

  return (
    <div className="h-screen overflow-auto w-[var(--right-dashboard-side-bar-width)] border-l border-cc-border">
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
      <RightSidebarTab
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
      <RightSidebarTab
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
      <RightSidebarTab
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
      <RightSidebarTab
        title="Tests"
        count={8}
        onClick={handleTestsTabClick}
        isOpen={testsTabOpen}
      />
      {testsTabOpen && <div className="">tests is open</div>}
    </>
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
