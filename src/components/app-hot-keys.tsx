'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import links from '~/lib/constants/links';

// TODO: Implement useDebounce and add double key down press e.g sd => dashboard
export default function AppHotKeys({children} : {children: React.ReactNode}) {
  const router = useRouter();
  // const setIsActive = useLeftSidebarStore(state => state.setIsActive);
  // const isActive = useLeftSidebarStore(state => state.isActive);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Dashboard
      if (e.ctrlKey && e.key === 'm') {
        router.push(links.dashboard);
      }
      // if (e.shiftKey && e.key === "\\") {
      //   console.log('Update!!!')
      //   setIsActive(!isActive);
      // }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return (() => removeEventListener('keydown', handleKeyPress));
  }, [router]);

  return (
    <>{children}</>
  )
}
