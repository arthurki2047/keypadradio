"use client";

import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Phone, Grip, Delete } from 'lucide-react';

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
      <div className="relative flex justify-center items-center mb-2">
        <div className="absolute right-0"><KeypadButton onClick={() => onKeyPress('ArrowRight')}><ArrowRight /></KeypadButton></div>
        <div className="absolute left-0"><KeypadButton onClick={() => onKeyPress('ArrowLeft')}><ArrowLeft /></KeypadButton></div>
        <div className="flex flex-col items-center">
            <KeypadButton onClick={() => onKeyPress('ArrowUp')}><ArrowUp /></KeypadButton>
            <Button
              variant="default"
              className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg text-lg font-bold my-1"
              onClick={() => onKeyPress('Enter')}
            >
              OK
            </Button>
            <KeypadButton onClick={() => onKeyPress('ArrowDown')}><ArrowDown /></KeypadButton>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 place-items-center">
        {numKeys.map((key) => {
            let icon;
            if (key === '1') icon = <Grip className="w-4 h-4" />;
            if (key === '*') icon = <span className="text-2xl">*</span>;
            if (key === '#') icon = <Delete className="w-5 h-5" />;
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
