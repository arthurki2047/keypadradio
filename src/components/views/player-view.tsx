"use client";
import type { useKeypad } from "@/hooks/use-keypad";
import Image from "next/image";
import { Home, List, Music, Star } from 'lucide-react';

type PlayerViewProps = ReturnType<typeof useKeypad>;

export function PlayerView({ currentStation, isPlaying }: PlayerViewProps) {
  if (!currentStation) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="relative w-32 h-32 mb-6">
        <Image
          src={currentStation.logoUrl}
          alt={currentStation.name}
          width={128}
          height={128}
          className="rounded-full shadow-lg border-4 border-primary"
          unoptimized
        />
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full bg-primary/20 rounded-full animate-ping"></div>
            <Music className="w-12 h-12 text-primary-foreground animate-pulse" />
          </div>
        )}
      </div>
      <h3 className="text-2xl font-headline font-bold text-foreground">{currentStation.name}</h3>
      <p className="text-muted-foreground">{isPlaying ? 'Now Playing' : 'Paused'}</p>
      <div className="mt-auto text-xs text-muted-foreground space-y-1">
        <p>
            <span className="font-bold p-1 bg-gray-200 dark:bg-gray-700 rounded">5</span> Play/Pause
        </p>
        <p>
            <span className="font-bold p-1 bg-gray-200 dark:bg-gray-700 rounded">7</span> Add to Presets <Star className="inline w-3 h-3 text-amber-400"/>
        </p>
        <p>
            <span className="font-bold p-1 bg-gray-200 dark:bg-gray-700 rounded">*</span> Back to List <List className="inline w-3 h-3"/>
        </p>
        <p>
            <span className="font-bold p-1 bg-gray-200 dark:bg-gray-700 rounded">1</span> Main Menu <Home className="inline w-3 h-3"/>
        </p>
      </div>
    </div>
  );
}
