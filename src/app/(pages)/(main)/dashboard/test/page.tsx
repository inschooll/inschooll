'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react'

const DragAndScrollPractice = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = containerRef.current;
    if (!slider) return;

    let isDown: boolean;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;

      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
      // console.log({pageX: e.pageX, offsetX: e.offsetX});
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    slider.addEventListener('mouseup', () => {
      isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();

      const x = e.pageX;
      const walk = (startX - x) * 7;
      console.log({startX, x, walk, scrollLeft});
      slider.scrollLeft = scrollLeft + walk;
    });
  }, []);

  return (
    <div className='w-full overflow-auto' ref={containerRef}>
      <CardsList />
    </div>
  );
}

export default DragAndScrollPractice;

const CardsList = () => {
  const items = Array.from({length: 50}, (_, i) => i);

  return (
    <div className='flex active:cursor-grabbing' >
        {items.map((i) => (
          <div key={i} className='size-40 shrink-0 border border-slate-500 text-center'>
            <Link href={'https://youtube.com'}>youtube</Link>
          </div>
        ))}
    </div>
  );
}