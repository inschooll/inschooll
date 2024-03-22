"use client"

import { addDays, format } from "date-fns"
import React, { useEffect } from "react"
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import { Button } from "../button"
import { cn } from "~/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../calendar"

const customDateRange = {
  from: new Date(2022, 0, 20),
  to: addDays(new Date(2022, 0, 20), 20),
}

export default function DatePickerWithRange({
  className,
  defaultDateRange = customDateRange,
  updateDate,
}: React.HTMLAttributes<HTMLDivElement> & {defaultDateRange?: DateRange, updateDate: (dateRange?: DateRange) => void}) {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultDateRange);

  useEffect(() => {
    setDate(defaultDateRange);

  }, [defaultDateRange, setDate])
  
  const handleDateRange = (dateRange?: DateRange) => {
    setDate(dateRange);
    updateDate(dateRange);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}