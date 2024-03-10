"use client";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";

export default function DashboardCalendar() {
    const [date, setDate] = useState<Date>();
  
    return (
      <div className="mt-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
          classNameCell="h-7 w-7"
        />
      </div>
    );
  }
  