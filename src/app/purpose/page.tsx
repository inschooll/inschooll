'use client';
import React from "react";
import Button from "../_components/buttons/button";
import Navbar from "../_components/navbar/navbar";

const Purpose = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  return (
    <>
      <Navbar />

      <div className="sm:mx-10 lg:mx-20 h-full">
        <div className="sm:w-96 my-5 mx-auto h-full translate-y-[10%]">
          <h1 className="text-center font-bold text-2xl sm:text-3xl">
            Who are you?
          </h1>

          <div className="mt-8">
            <PurposeTile text="I am a student" isSelected={selectedIndex === 0} onClick={() => setSelectedIndex(0)} />
            <PurposeTile text="I am someone seeking admission" isSelected={selectedIndex === 1} onClick={() => setSelectedIndex(1)} />
            <PurposeTile text="I am a lecturer (or a staff)" isSelected={selectedIndex === 2} onClick={() => setSelectedIndex(2)} />
            <PurposeTile text="I am someone seeking to add their school" isSelected={selectedIndex === 3} onClick={() => setSelectedIndex(3)} />
          </div>

          <div className="mt-3">
            <Button variant={"defaultFull"} size={"md"}>Next</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Purpose;


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