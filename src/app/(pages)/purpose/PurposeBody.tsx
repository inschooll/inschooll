"use client";
import React from "react";
import Button from "~/components/buttons/button";
import Link from "next/link";
import links from "~/app/core/constants/links";
import { cn } from "~/lib/utils";

export default function PurposeBody() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const options = [
    { title: "I am a university student", href: "" },
    { title: "I am an undergraduate seeking admission", href: "" },
    { title: "I am a teaching staff at a university", href: "" },
    { title: "I am a non-teaching staff at a university", href: "" },
    { title: "I am a university owner / representative", href: links.createSchool },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 pt-2">
        {options.map((item, i) => (
          <PurposeTile
            key={i}
            text={item.title}
            isSelected={selectedIndex === i}
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      <div className="mt-3">
        <Link
          href={options[selectedIndex ?? 0]!.href}
          onClick={() => setIsLoading(true)}
        >
          <Button variant={"defaultFull"} isLoading={isLoading} size={"lg"}>
            Next
          </Button>
        </Link>
      </div>
    </>
  );
}

const PurposeTile = ({
  text,
  isSelected,
  onClick,
}: {
  text: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "app-hover w-full cursor-pointer rounded border-[1px] border-border bg-cc-background px-5 py-3 text-cc-content/90 shadow-sm active:bg-transparent",
        { "border-cc-primary text-cc-content ring-2": isSelected },
      )}
    >
      <p className="">{text}</p>
    </div>
  );
};
