"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { Radio } from "lucide-react";
import { useEffect, useRef } from "react";

type HomeViewProps = ReturnType<typeof useKeypad>;

export function HomeView({ activeIndex, setView, setActiveIndex, setFilteredStations, allStations }: HomeViewProps) {
  const menuItems = [
    { label: "Stations", view: "STATIONS" as const },
    { label: "Search", view: "SEARCH" as const },
    { label: "Favorites", view: "FAVORITES" as const },
    { label: "Guide", view: "GUIDE" as const },
  ];
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeIndex]);

  const handleMenuClick = (view: "STATIONS" | "SEARCH" | "FAVORITES" | "GUIDE") => {
    if (view === "SEARCH") {
      setFilteredStations(allStations);
    }
    setView(view);
    setActiveIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-foreground p-4 bg-gradient-to-b from-background to-muted/20">
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="p-2.5 bg-primary/10 rounded-full mb-2 shadow-inner">
          <Radio className="w-10 h-10 text-primary animate-pulse" />
        </div>
        <h2 className="text-xl font-headline font-bold text-primary tracking-tight">Amar Radio</h2>
        <p className="text-[8px] text-muted-foreground mt-0.5 uppercase tracking-[0.2em] font-bold opacity-60">Bangla Digital Radio</p>
      </div>

      <div className="w-full max-w-[180px]">
        <ul className="space-y-1.5">
          {menuItems.map((item, index) => (
            <li key={item.label} ref={index === activeIndex ? activeItemRef : null}>
              <button
                onClick={() => handleMenuClick(item.view)}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-300 focus:outline-none text-[11px] font-semibold border ${
                  index === activeIndex
                    ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02] border-primary z-10 relative'
                    : 'bg-card/50 hover:bg-muted/80 border-border/40 backdrop-blur-sm'
                }`}
              >
                <span className="opacity-40 mr-2 font-mono text-[9px]">{index + 1}</span> {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
