import React from 'react'
import { cn } from '~/lib/utils';

const Divider = ({className} : {className?: string}) => {
  return (<div className={cn("h-[1px] w-full bg-cc-border", className)}></div>);
}

export default Divider;