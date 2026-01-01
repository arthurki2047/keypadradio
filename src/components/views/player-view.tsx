
"use client";
import type { useKeypad } from "@/hooks/use-keypad";
import Image from "next/image";
import { Home, List, Music, Star, Play, Pause, SkipBack, SkipForward, ArrowUp, ArrowDown, Mic, Square } from 'lucide-react';
import { Button } from "@/components/ui/button";

type PlayerViewProps = ReturnType<typeof useKeypad>;

export function PlayerView({ currentStation, isPlaying, togglePlayPause, playNext, playPrevious, isRecording, toggleRecording }: PlayerViewProps) {
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
      <h3 className="text-xl font-headline font-bold text-foreground truncate max-w-full px-4">{currentStation.name}</h3>
      <p className="text-muted-foreground text-sm">{isPlaying ? 'Now Playing' : 'Paused'}</p>

      <div className="flex items-center gap-4 my-6">
        <Button onClick={playPrevious} variant="ghost" size="icon" className="h-14 w-14 rounded-full">
            <SkipBack className="w-8 h-8" />
        </Button>
        <Button onClick={togglePlayPause} variant="default" size="icon" className="h-20 w-20 rounded-full shadow-lg">
            {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
        </Button>
        <Button onClick={playNext} variant="ghost" size="icon" className="h-14 w-14 rounded-full">
            <SkipForward className="w-8 h-8" />
        </Button>
      </div>

       <div className="mt-4">
        <Button onClick={toggleRecording} variant={isRecording ? 'destructive' : 'outline'} size="lg" className={`w-48 rounded-full transition-all ${isRecording ? 'animate-pulse' : ''}`}>
          {isRecording ? <Square className="mr-2" /> : <Mic className="mr-2" />}
          {isRecording ? 'Stop Recording' : 'Record to File'}
        </Button>
      </div>

      <div className="mt-auto text-xs text-muted-foreground space-y-1">
         <p>
            Use <ArrowUp className="inline w-3 h-3"/> / <ArrowDown className="inline w-3 h-3"/> to change stations.
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
