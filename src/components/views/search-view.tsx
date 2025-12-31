"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { useEffect, useRef } from "react";
import Image from 'next/image';
import { Search } from "lucide-react";

type SearchViewProps = ReturnType<typeof useKeypad>;

export function SearchView({ searchTerm, filteredStations, activeIndex }: SearchViewProps) {
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeIndex]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b">
        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 p-2 rounded-lg">
            <Search className="w-5 h-5 text-muted-foreground" />
            <div className="w-full text-lg font-mono min-h-[28px]">{searchTerm}
                <span className="animate-ping">_</span>
            </div>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredStations.map((station, index) => (
          <li
            key={station.id}
            ref={index === activeIndex ? activeItemRef : null}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              index === activeIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'
            }`}
          >
            <Image 
                src={station.logoUrl} 
                alt={station.name} 
                width={40} 
                height={40} 
                className="rounded-md"
                unoptimized
            />
            <span className="font-semibold">{station.name}</span>
          </li>
        ))}
        {filteredStations.length === 0 && (
            <li className="text-center text-muted-foreground p-8">No stations found for "{searchTerm}".</li>
        )}
      </ul>
      <div className="text-center text-xs text-muted-foreground p-1 border-t">
        Use keypad to search. # for backspace.
      </div>
    </div>
  );
}
