"use client";

import { Phone } from '@/components/phone';
import AudioPlayer from '@/components/audio-player';
import { useKeypad } from '@/hooks/use-keypad';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const keypadState = useKeypad();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-300 dark:bg-gray-800 p-4 overflow-hidden">
      <h1 className="text-4xl font-headline font-bold text-primary mb-4">Amar Radio</h1>
      <Phone {...keypadState} />
      <AudioPlayer
        audioRef={keypadState.audioRef}
        streamUrl={keypadState.currentStation?.streamUrl ?? null}
      />
      <Toaster />
    </main>
  );
}
