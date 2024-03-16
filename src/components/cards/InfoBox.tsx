import React from "react";
import { PiWarningBold } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function InfoBox(props: {
  text: string | React.ReactNode;
  type?: "error" | "warning" | "success";
  customIcon?: React.ReactNode;
}) {
  let icon: React.ReactNode;

  if (props.customIcon) {
    icon = props.customIcon;
  } else if (props.type === "error") {
    icon = <MdErrorOutline className="text-white" size={20} />;
  } else if (props.type === "warning") {
    icon = <PiWarningBold className="text-white" size={20} />;
  } else if (props.type === "success") {
    icon = <FaRegCheckCircle className="text-white" size={20} />;
  }

  return (
    <div
      className={`my-4 flex w-full items-start gap-4 rounded px-5 py-4 leading-5 border
      ${props.type === undefined ? "bg-black text-white" : ""}
      ${props.type === "error" ? "bg-red-500/80 border-red-500 text-white" : ""}
      ${props.type === "warning" ? "bg-yellow-500/80 border-yellow-500 text-white" : ""}
      ${props.type === "success" ? "bg-green-500/80 border-green-500 text-white" : ""}`}
    >
      <div className='shrink-0'>
        {icon ?? <></>}
      </div>
      <p>{props.text}</p>
    </div>
  );
}
