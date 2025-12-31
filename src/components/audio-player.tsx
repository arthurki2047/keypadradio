"use client";

import type { ForwardedRef } from 'react';

interface AudioPlayerProps {
    audioRef: ForwardedRef<HTMLAudioElement>;
    streamUrl: string | null;
}

function AudioPlayer({ audioRef, streamUrl }: AudioPlayerProps) {
    return <audio ref={audioRef} src={streamUrl || ''} className="hidden" />;
}

export default AudioPlayer;
