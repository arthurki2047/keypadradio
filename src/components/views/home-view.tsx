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
    <div className="flex flex-col items-center justify-center h-full text-foreground p-6 bg-gradient-to-b from-background to-muted/20">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4 shadow-inner">
          <Radio className="w-16 h-16 text-primary animate-pulse" />
        </div>
        <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">Amar Radio</h2>
        <p className="text-muted-foreground text-xs mt-2 uppercase tracking-[0.2em] font-bold opacity-60">Daily Bangla Music</p>
      </div>

      <div className="w-full max-w-[220px]">
        <ul className="space-y-2.5">
          {menuItems.map((item, index) => (
            <li key={item.label} ref={index === activeIndex ? activeItemRef : null}>
              <button
                onClick={() => handleMenuClick(item.view)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl transition-all duration-300 focus:outline-none text-sm font-semibold border ${
                  index === activeIndex
                    ? 'bg-primary text-primary-foreground shadow-xl scale-[1.05] border-primary z-10 relative'
                    : 'bg-card/50 hover:bg-muted/80 border-border/40 backdrop-blur-sm'
                }`}
              >
                <span className="opacity-40 mr-4 font-mono text-xs">{index + 1}</span> {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
