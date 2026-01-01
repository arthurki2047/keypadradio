"use client";

import { Phone } from '@/components/phone';
import AudioPlayer from '@/components/audio-player';
import { useKeypad } from '@/hooks/use-keypad';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';

export default function Home() {
  const keypadState = useKeypad();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-300 dark:bg-gray-800 p-4 overflow-hidden">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">Amar Radio</h1>
        <Phone {...keypadState} />
      </motion.div>
      <AudioPlayer
        audioRef={keypadState.audioRef}
        streamUrl={keypadState.currentStation?.streamUrl ?? null}
      />
      <Toaster />
    </main>
  );
}
