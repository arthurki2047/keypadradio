"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { useEffect, useRef } from "react";
import Image from 'next/image';
import { Star } from "lucide-react";

type FavoritesViewProps = ReturnType<typeof useKeypad>;

export function FavoritesView({ filteredStations, activeIndex }: FavoritesViewProps) {
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeIndex]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-2 p-3 border-b bg-muted/20">
        <Star className="w-4 h-4 text-amber-400 fill-current" />
        <h2 className="text-sm font-headline font-bold">My Favorites</h2>
      </div>
      <ul className="flex-1 overflow-y-auto p-1.5 space-y-1">
        {filteredStations.length > 0 ? filteredStations.map((station, index) => (
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
        )) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                <p className="text-[10px]">No favorites saved yet.</p>
            </div>
        )}
      </ul>
    </div>
  );
}
