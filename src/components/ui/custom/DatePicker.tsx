"use client";

import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type DatePickerProps = {
  className?: string;
  updateDate: (date: Date) => void
}

export default function DatePicker(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const updateDate = (selectedDate?: Date) => {
    if (!selectedDate) return;
    
    setDate(selectedDate);
    props.updateDate(selectedDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full md:w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            props.className
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span className="font-semibold text-cc-content/70">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={updateDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
