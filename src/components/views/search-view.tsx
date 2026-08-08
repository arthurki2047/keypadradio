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
    <div className="flex flex-col h-full bg-background">
      <div className="p-2 border-b bg-muted/20">
        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-xl border">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="w-full text-xs font-mono min-h-[16px] overflow-hidden whitespace-nowrap">
                {searchTerm}
                <span className="animate-pulse">|</span>
            </div>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto p-1.5 space-y-1">
        {filteredStations.map((station, index) => (
          <li
            key={station.id}
            ref={index === activeIndex ? activeItemRef : null}
            className={`flex items-center gap-2.5 p-1.5 rounded-xl transition-colors ${
              index === activeIndex ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/5'
            }`}
          >
            <Image 
                src={station.logoUrl} 
                alt={station.name} 
                width={32} 
                height={32} 
                className="rounded-lg shadow-sm"
                unoptimized
            />
            <span className="text-[11px] font-bold line-clamp-1">{station.name}</span>
          </li>
        ))}
        {filteredStations.length === 0 && searchTerm && (
            <li className="text-center text-muted-foreground p-6 text-[10px]">No results for "{searchTerm}".</li>
        )}
      </ul>
    </div>
  );
}
