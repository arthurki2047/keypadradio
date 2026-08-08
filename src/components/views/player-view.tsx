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
    <div className="flex flex-col items-center justify-between h-full text-center p-6 bg-gradient-to-b from-background via-muted/5 to-primary/10">
      <div className="w-full pt-4">
        <Clock />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 mb-10">
          <div className={`absolute -inset-6 bg-primary/10 rounded-full transition-all duration-1000 ${isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`} />
          <div className={`absolute -inset-10 bg-primary/5 rounded-full transition-all duration-1000 delay-150 ${isPlaying ? 'scale-125 opacity-100' : 'scale-80 opacity-0'}`} />
          <Image
            src={currentStation.logoUrl}
            alt={currentStation.name}
            width={192}
            height={192}
            className={`rounded-[2.5rem] shadow-2xl border-2 border-primary/20 transition-all duration-700 relative z-10 ${isPlaying ? 'scale-100 rotate-0' : 'scale-90 brightness-75 -rotate-2'}`}
            unoptimized
          />
          {isPlaying && (
            <div className="absolute -bottom-3 -right-3 bg-primary p-2.5 rounded-full shadow-2xl z-20">
              <Music className="w-6 h-6 text-primary-foreground animate-bounce" />
            </div>
          )}
        </div>

        <div className="space-y-2 px-4 relative z-10">
          <h3 className="text-2xl font-headline font-bold text-foreground leading-tight tracking-tight">{currentStation.name}</h3>
          <div className="flex items-center justify-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-primary ${isPlaying ? 'animate-pulse' : 'opacity-30'}`} />
            <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] opacity-80">
              {isPlaying ? 'Live Stream' : 'Station Paused'}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full pb-10">
        <div className="flex items-center justify-center gap-6">
          <Button onClick={playPrevious} variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-90">
              <SkipBack className="w-6 h-6" />
          </Button>
          <Button onClick={togglePlayPause} variant="default" size="icon" className="h-24 w-24 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground border-4 border-background/20">
              {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12 ml-1" />}
          </Button>
          <Button onClick={playNext} variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-90">
              <SkipForward className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
