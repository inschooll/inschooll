'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import links from '~/lib/constants/links';

export default function AppHotKeys({children} : {children: React.ReactNode}) {
  const router = useRouter();
  

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Dashboard
      if (e.ctrlKey && e.key === 'm') {
        router.push(links.dashboard);
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    return (() => removeEventListener('keydown', handleKeyPress));
  }, [router]);

  return (
    <>{children}</>
  )
}
