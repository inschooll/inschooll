"use client";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { cn } from "~/lib/utils";

export default function DashboardCalendar({className} : {className: string}) {
    const [date, setDate] = useState<Date>();
  
    return (
      <div className={cn("flex bg-amber-2000 justify-center", className)}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
          classNameCell="h-[1.7rem] w-[2.25rem] "
        />
      </div>
    );
  }
  