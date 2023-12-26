import Image from "next/image";

interface AvatarUsernameProps {imgUrl: string, 
  text: string, 
  imgSize?: number, 
  textSize?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl", 
  fontWeight?: "normal" | "medium" | "semibold" | "bold", 
}

export default function AvatarUsername({imgUrl, text, imgSize=6, textSize="base", fontWeight="semibold"} : AvatarUsernameProps)  {
  return (
    <div className={"flex gap-2 items-center"}>
      <Avatar url={imgUrl} size={imgSize} />
      <p className={`font-${fontWeight} text-${textSize} text-cc-content-sub truncate`}> {text} </p>
    </div>
  );
}

export function Avatar({url, size=6} : {url: string, size?: number}) {
  const imgSize = `w-${size} h-${size}`;
  return (
    <div className={`${imgSize} rounded-full overflow-hidden`}>
      <Image src={url} width={size*5} height={size*5} alt="user picture" className="w-full h-full object-cover" />
    </div>
  );
}