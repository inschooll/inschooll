'use client';

import { useEffect } from "react";

{/* This fragment component helps add unique css properties to the body element when it mounts */}
export default function StyleAdder() {

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const body = document.querySelector('body') as HTMLBodyElement;
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const html = document.querySelector('html') as HTMLHtmlElement;
    body.style.height = '100%';
    html.style.height = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    return () => {
      body.style.height = 'auto';
      html.style.height = 'auto';
      body.style.overflow = 'auto';
      html.style.overflow = 'auto';
    }
  })
  return (<></>);
}