'use client';
import React from "react";
import Button from "../_components/buttons/button";
import Link from "next/link";
import links from "../core/constants/links";

export default function PurposeBody() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  
  return (
    <>
      <div className="mt-8">
        <PurposeTile text="I am a university student" isSelected={selectedIndex === 0} onClick={() => setSelectedIndex(0)} />
        <PurposeTile text="I am an undergraduate seeking admission" isSelected={selectedIndex === 1} onClick={() => setSelectedIndex(1)} />
        <PurposeTile text="I am a teaching staff at a university" isSelected={selectedIndex === 2} onClick={() => setSelectedIndex(2)} />
        <PurposeTile text="I am a non-teaching staff at a university" isSelected={selectedIndex === 3} onClick={() => setSelectedIndex(3)} />
        <PurposeTile text="I am a university owner / representative" isSelected={selectedIndex === 4} onClick={() => setSelectedIndex(4)} />
      </div>

      <div className="mt-3">
        <Link href={getNextPageLink(selectedIndex)} >
          <Button variant={"defaultFull"} size={"lg"}>Next</Button>
        </Link>
      </div>
    </>
  );
}

const PurposeTile = ({text, isSelected, onClick} : {text: string, isSelected: boolean, onClick: React.MouseEventHandler<HTMLDivElement>}) => {
  const getStyles = () => {
    if (isSelected) {
      return "mt-3 border-[1px] rounded bg-cc-content-main/5 border-cc-content-main/20 w-full py-3 px-5 shadow-sm active:bg-transparent cursor-pointer";
    }
    return "mt-3 border-[1px] rounded bg-cc-content-main/5 border-cc-content-main/20 w-full py-3 px-5 shadow-sm active:bg-transparent hover:shadow cursor-pointer";
  }
  return (
    <div onClick={onClick} className={getStyles()} style={isSelected ? {boxShadow: '0 0 1px 2px #C3DEFF', borderColor: '#54A0FF'} : {}}>
      <p>{text}</p>
    </div>
  );
}

function getNextPageLink(index: number | null) {
  switch (index) {
    case 0:
      return '/';
    case 1:
      return '/';
    case 2:
      return '/';
    case 3:
      return '/';
    case 4:
      return links.createSchool;
    default:
      return '/';
  }
}