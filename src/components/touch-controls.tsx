"use client";

import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface TouchControlsProps {
  onKeyPress: (key: string) => void;
}

export function TouchControls({ onKeyPress }: TouchControlsProps) {
  const ControlButton = ({
    children,
    onClick,
    className = '',
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <Button
      variant="ghost"
      className={`h-12 w-12 text-lg rounded-full font-bold text-foreground/60 hover:bg-primary/20 focus:bg-primary/30 active:scale-95 transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-b-[30px] flex-shrink-0">
      <div className="relative flex justify-center items-center h-28">
        <div className="absolute right-2">
            <ControlButton onClick={() => onKeyPress('ArrowRight')}>
                <ArrowRight size={24} />
            </ControlButton>
        </div>
        <div className="absolute left-2">
            <ControlButton onClick={() => onKeyPress('ArrowLeft')}>
                <ArrowLeft size={24}/>
            </ControlButton>
        </div>
        <div className="flex flex-col items-center">
            <ControlButton onClick={() => onKeyPress('ArrowUp')}>
                <ArrowUp size={24}/>
            </ControlButton>
            <Button
              variant="default"
              className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg text-base font-bold my-1"
              onClick={() => onKeyPress('Enter')}
            >
              OK
            </Button>
            <ControlButton onClick={() => onKeyPress('ArrowDown')}>
                <ArrowDown size={24}/>
            </ControlButton>
        </div>
      </div>
    </div>
  );
}
