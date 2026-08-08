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
    <div className="flex flex-col items-center justify-center h-full text-foreground p-4">
      <Radio className="w-16 h-16 text-primary animate-pulse" />
      <h2 className="text-2xl font-headline font-bold mt-4">Amar Radio</h2>
      <p className="text-muted-foreground text-[10px]">Your daily dose of music</p>
      <div className="mt-6 w-full max-w-[200px]">
        <ul className="space-y-1.5">
          {menuItems.map((item, index) => (
            <li key={item.label} ref={index === activeIndex ? activeItemRef : null}>
              <button
                onClick={() => handleMenuClick(item.view)}
                className={`w-full text-left p-2 rounded-lg transition-colors focus:outline-none text-sm ${
                  index === activeIndex
                    ? 'bg-primary text-primary-foreground shadow-sm scale-[1.02]'
                    : 'bg-background hover:bg-primary/5 border border-border/50'
                }`}
              >
                <span className="font-bold mr-2 opacity-50">{index + 1}.</span> {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
