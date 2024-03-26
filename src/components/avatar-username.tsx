import Image from "next/image";
import { cn } from "~/lib/utils";

interface AvatarUsernameProps {imgUrl: string, 
  text: string, 
  imgSize?: number, 
  textClassName?: string, 
  fontWeight?: "normal" | "medium" | "semibold" | "bold", 
}

export default function AvatarUsername({imgUrl, text, textClassName, imgSize=6,} : AvatarUsernameProps)  {
  return (
    <div className={"flex gap-2 items-center"}>
      <Avatar url={imgUrl} size={imgSize} />
      <p className={cn("font-medium text-cc-content-sub truncate", textClassName)}> {text} </p>
    </div>
  );
}

export function Avatar({url, size=6} : {url: string, size?: number}) {
  return (
    <div className={cn("rounded-full overflow-hidden", `size-${size}`)}>
      <Image src={url} width={size*10} height={size*10} alt="user picture" className="w-full h-full object-cover" />
    </div>
  );
}