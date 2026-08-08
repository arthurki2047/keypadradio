"use client";

import { Phone } from '@/components/phone';
import AudioPlayer from '@/components/audio-player';
import { useKeypad } from '@/hooks/use-keypad';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const keypadState = useKeypad();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-900 p-4 overflow-hidden">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Phone {...keypadState} />
      </motion.div>
      <AudioPlayer
        audioRef={keypadState.audioRef}
        onCanPlay={keypadState.handleCanPlay}
      />
      <Toaster />
    </main>
  );
}
