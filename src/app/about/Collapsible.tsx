'use client';

import { useState } from 'react';

export default function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5 group cursor-pointer"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          fill="currentColor"
        >
          <path d="M3 1l4 4-4 4z" />
        </svg>
        {title}
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
