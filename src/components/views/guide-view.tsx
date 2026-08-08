"use client";

import type { useKeypad } from "@/hooks/use-keypad";
import { HelpCircle, ChevronLeft } from "lucide-react";

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
      <div className="flex items-center gap-2 p-3 border-b bg-muted/30">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-headline font-bold">Shortcuts Guide</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 gap-2">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex justify-between items-center p-2 rounded-md border bg-card">
              <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded text-primary border border-primary/20">
                {s.keys}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 border-t bg-muted/10 text-center">
        <p className="text-[10px] text-muted-foreground italic">Press * or Back to return</p>
      </div>
    </div>
  );
}
