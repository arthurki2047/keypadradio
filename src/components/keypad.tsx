"use client";

import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Phone, Grip, Backspace } from 'lucide-react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

export function Keypad({ onKeyPress }: KeypadProps) {
  const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const KeypadButton = ({
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
      className={`h-12 w-12 rounded-full text-xl font-bold text-foreground/80 hover:bg-primary/20 focus:bg-primary/30 active:scale-95 transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-b-[28px]">
      <div className="relative flex justify-center items-center mb-4">
        <KeypadButton className="absolute right-0" onClick={() => onKeyPress('ArrowRight')}><ArrowRight /></KeypadButton>
        <KeypadButton className="absolute left-0" onClick={() => onKeyPress('ArrowLeft')}><ArrowLeft /></KeypadButton>
        <KeypadButton className="absolute top-[-20px]" onClick={() => onKeyPress('ArrowUp')}><ArrowUp /></KeypadButton>
        <KeypadButton className="absolute bottom-[-20px]" onClick={() => onKeyPress('ArrowDown')}><ArrowDown /></KeypadButton>
        <Button
          variant="default"
          className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg text-lg font-bold"
          onClick={() => onKeyPress('Enter')}
        >
          OK
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-12 place-items-center">
        {numKeys.map((key) => {
            let icon;
            if (key === '1') icon = <Grip className="w-4 h-4" />;
            if (key === '*') icon = <span className="text-2xl">*</span>;
            if (key === '#') icon = <Backspace className="w-5 h-5" />;
          return (
            <KeypadButton key={key} onClick={() => onKeyPress(key)}>
              {icon || key}
            </KeypadButton>
          );
        })}
      </div>
    </div>
  );
}
