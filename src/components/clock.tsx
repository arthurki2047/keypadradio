"use client";

import { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial time on the client to avoid hydration mismatch
    setTime(new Date());

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Render a placeholder or nothing until the time is available on the client
  if (!time) {
    return (
        <div className="text-center text-xs font-mono text-neutral-400 h-8" />
    );
  }

  return (
    <div className="text-center text-xs font-mono text-neutral-400">
      <div>{formatTime(time)} | {formatDate(time)}</div>
    </div>
  );
}
