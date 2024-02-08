"use client";
import Input from "~/components/inputs/input";
import { T5 } from "~/components/texts/title";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";


export default function AddModuleDialog() {

  return (
    <>
      <div className="border-b border-border px-3 py-3 md:px-6">
        <T5>Add course module</T5>
      </div>
      <ScrollArea>
        <div className="flex h-screen flex-col gap-5 px-3 py-5 md:px-6">

          {/*  Module Title */}
          <Input
            label="Module title"
            name="moduleTitle"
            description="The title of the course module"
            type="number"
            className="w-20"
          />
        </div>
      </ScrollArea>
      <div className="border-t border-border px-3 py-3 md:px-6">
        <div className="flex justify-end">
          <Button className={"w-full md:w-28"}>Add</Button>
        </div>
      </div>
    </>
  );
}