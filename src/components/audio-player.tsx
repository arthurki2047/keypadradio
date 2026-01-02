"use client";

import type { ForwardedRef } from 'react';

interface AudioPlayerProps {
    audioRef: ForwardedRef<HTMLAudioElement>;
    onCanPlay: () => void;
}

function AudioPlayer({ audioRef, onCanPlay }: AudioPlayerProps) {
    return <audio ref={audioRef} onCanPlay={onCanPlay} className="hidden" crossOrigin="anonymous" />;
}

export default AudioPlayer;
