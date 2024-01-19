import { PiWarningBold } from "react-icons/pi";

type InfoTypeProp = "error" | "warning" | "info" | "success";

export interface infoProp {
  message: string; 
  type: InfoTypeProp;
};

export default function InfoContainer({message, type} : infoProp) {
  const color = getContainerColor(type);
  return (
    <div className={`my-4 flex w-full items-center gap-4 rounded px-5 py-4 leading-5 ${color}`}>
      <PiWarningBold className="text-white" size={20} />
      <p className="text-white">{message}</p>
    </div>
  );
}

function getContainerColor(type: InfoTypeProp) {
  switch (type) {
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-amber-400";
    case "info":
      return "bg-cc-primary";
    case "success":
      return "bg-green-500";
  }
}