"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { Radio } from "lucide-react";
import { useEffect, useRef } from "react";

type HomeViewProps = ReturnType<typeof useKeypad>;

export function HomeView({ activeIndex, setView, setActiveIndex, setFilteredStations, allStations }: HomeViewProps) {
  const menuItems = [
    { label: "Stations", view: "STATIONS" as const },
    { label: "Search", view: "SEARCH" as const },
    { label: "Presets", view: "PRESETS" as const },
  ];
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeIndex]);

  const handleMenuClick = (view: "STATIONS" | "SEARCH" | "PRESETS") => {
    if (view === "SEARCH") {
      setFilteredStations(allStations);
    }
    setView(view);
    setActiveIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-foreground">
      <Radio className="w-24 h-24 text-primary animate-pulse" />
      <h2 className="text-3xl font-headline font-bold mt-4">Amar Radio</h2>
      <p className="text-muted-foreground">Your daily dose of Bangla music</p>
      <div className="mt-8 w-full">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={item.label} ref={index === activeIndex ? activeItemRef : null}>
              <button
                onClick={() => handleMenuClick(item.view)}
                className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  index === activeIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-primary/10'
                }`}
              >
                <span className="font-bold">{index + 1}.</span> {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
