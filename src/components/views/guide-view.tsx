"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { HelpCircle } from "lucide-react";

type GuideViewProps = ReturnType<typeof useKeypad>;

export function GuideView({ setView }: GuideViewProps) {
  const shortcuts = [
    { keys: "↑ / ↓", desc: "Navigate Lists" },
    { keys: "Enter / 5", desc: "Select / Play / Pause" },
    { keys: "← / →", desc: "Prev / Next Channel" },
    { keys: "* / Back", desc: "Go Back" },
    { keys: "1", desc: "Quick Home (Player)" },
    { keys: "7", desc: "Add Favorite (Player)" },
    { keys: "2-9", desc: "T9 Search Typing" },
    { keys: "#", desc: "Backspace (Search)" },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-4 p-5 border-b bg-muted/30">
        <div className="p-2.5 bg-primary/15 rounded-xl">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-headline font-bold tracking-tight">Shortcuts Guide</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {shortcuts.map((s, i) => (
          <div key={i} className="flex justify-between items-center p-4 rounded-2xl border bg-card/40 backdrop-blur-sm shadow-sm transition-all hover:bg-card/60">
            <span className="font-mono text-[10px] font-black bg-primary/10 px-2.5 py-1.5 rounded-lg text-primary border border-primary/10">
              {s.keys}
            </span>
            <span className="text-xs font-semibold text-muted-foreground/80">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
