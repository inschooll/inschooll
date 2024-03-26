import { cva, type VariantProps } from "class-variance-authority";
import React, { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

const infoBoxVariant = cva(
  "my-4 flex w-full items-start gap-4 rounded px-5 py-4 leading-5 border", 
  {
    variants: {
      variant: {
        info: 'bg-red-500/80 border-red-500 text-white',
        error: 'bg-red-500/80 border-red-500 text-white',
        warning: 'bg-yellow-500/80 border-yellow-500 text-white',
        success: 'bg-green-500/80 border-green-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'info',
    }
  }
);

type InfoBoxProps = {
  text: string | React.ReactNode;
  className?: string,
  customIcon?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement> & VariantProps<typeof infoBoxVariant>;
export default function InfoBox({className, variant, ...props}: InfoBoxProps) {
  let icon: React.ReactNode;

  return (
    <div
      className={cn(infoBoxVariant({variant, className}))}
    >
      <div className='shrink-0'>
        {icon ?? <></>}
      </div>
      <p>{props.text}</p>
    </div>
  );
}
