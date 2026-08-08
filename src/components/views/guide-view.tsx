"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { HelpCircle } from "lucide-react";

type GuideViewProps = ReturnType<typeof useKeypad>;

export function GuideView({ setView }: GuideViewProps) {
  const shortcuts = [
    { keys: "↑ / ↓", desc: "Navigate" },
    { keys: "Enter", desc: "Select/Play" },
    { keys: "← / →", desc: "Channel" },
    { keys: "*", desc: "Back" },
    { keys: "1", desc: "Home" },
    { keys: "7", desc: "Favorite" },
    { keys: "2-9", desc: "T9 Type" },
    { keys: "#", desc: "Backspace" },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-3 p-3 border-b bg-muted/20">
        <div className="p-1.5 bg-primary/15 rounded-lg">
          <HelpCircle className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-headline font-bold tracking-tight">Shortcuts</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {shortcuts.map((s, i) => (
          <div key={i} className="flex justify-between items-center p-2 rounded-xl border bg-card/40 backdrop-blur-sm shadow-sm">
            <span className="font-mono text-[8px] font-black bg-primary/10 px-1.5 py-1 rounded-md text-primary border border-primary/10">
              {s.keys}
            </span>
            <span className="text-[9px] font-semibold text-muted-foreground">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
