"use client";
import type { useKeypad } from "@/hooks/use-keypad";
import Image from "next/image";
import { Music, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Clock } from "../clock";

type PlayerViewProps = ReturnType<typeof useKeypad>;

export function PlayerView({ currentStation, isPlaying, togglePlayPause, playNext, playPrevious }: PlayerViewProps) {
  if (!currentStation) return null;

  return (
    <div className="flex flex-col items-center justify-between h-full text-center p-4 bg-gradient-to-b from-background via-muted/5 to-primary/10">
      <div className="w-full pt-1">
        <Clock />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <div className="relative w-32 h-32 mb-4">
          <div className={`absolute -inset-4 bg-primary/10 rounded-full transition-all duration-1000 ${isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`} />
          <Image
            src={currentStation.logoUrl}
            alt={currentStation.name}
            width={128}
            height={128}
            className={`rounded-[2rem] shadow-xl border border-primary/20 transition-all duration-700 relative z-10 ${isPlaying ? 'scale-100 rotate-0' : 'scale-90 brightness-75 -rotate-2'}`}
            unoptimized
          />
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 bg-primary p-1.5 rounded-full shadow-lg z-20">
              <Music className="w-4 h-4 text-primary-foreground animate-bounce" />
            </div>
          )}
        </div>

        <div className="space-y-1 px-2 relative z-10">
          <h3 className="text-sm font-headline font-bold text-foreground leading-tight tracking-tight line-clamp-2">{currentStation.name}</h3>
          <div className="flex items-center justify-center gap-1.5">
            <span className={`w-1 h-1 rounded-full bg-primary ${isPlaying ? 'animate-pulse' : 'opacity-30'}`} />
            <p className="text-primary font-bold text-[7px] uppercase tracking-[0.2em] opacity-80">
              {isPlaying ? 'Live Stream' : 'Paused'}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full pb-4">
        <div className="flex items-center justify-center gap-4">
          <Button onClick={playPrevious} variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 text-muted-foreground transition-all active:scale-90">
              <SkipBack className="w-4 h-4" />
          </Button>
          <Button onClick={togglePlayPause} variant="default" size="icon" className="h-16 w-16 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground border-2 border-background/20">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-0.5" />}
          </Button>
          <Button onClick={playNext} variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 text-muted-foreground transition-all active:scale-90">
              <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
