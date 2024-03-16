"use client"

import type{ ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
  id: string,
  name: string,
  role: string,
  gender: "male" | "female",
  age: number,
  hasNIN: boolean,
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-red-400 text-left">Name</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-red-400 text-left">Role</div>,
  },
  {
    accessorKey: "gender",
    header: () => <div className="text-red-400 text-left">Gender</div>,
    cell: ({ row }) => {
      const value = row.getValue("gender");
      return (
        <div className="flex items-center gap-x-3">
          <div className="size-8 rounded-full bg-purple-500" />
          <p className="font-semibold">{value}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "hasNIN",
    header: "Has NIN",
    cell: (({row}) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }),
  },
]
