"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { useEffect, useRef } from "react";
import Image from 'next/image';
import { Star } from "lucide-react";

type PresetsViewProps = ReturnType<typeof useKeypad>;

export function PresetsView({ filteredStations, activeIndex }: PresetsViewProps) {
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeIndex]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2 border-b">
        <Star className="w-6 h-6 text-amber-400 fill-current" />
        <h2 className="text-xl font-headline font-bold">My Presets</h2>
      </div>
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredStations.length > 0 ? filteredStations.map((station, index) => (
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
        )) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <p>No presets saved yet.</p>
            </div>
        )}
      </ul>
    </div>
  );
}
