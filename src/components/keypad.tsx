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
      className={`h-8 w-8 text-sm rounded-full font-bold text-foreground/80 hover:bg-primary/20 focus:bg-primary/30 active:scale-95 transition-all p-0 ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-1.5 rounded-b-[22px] flex-1 flex flex-col justify-center">
      <div className="relative flex justify-center items-center">
        <div className="absolute right-3"><KeypadButton onClick={() => onKeyPress('ArrowRight')}><ArrowRight size={16} /></KeypadButton></div>
        <div className="absolute left-3"><KeypadButton onClick={() => onKeyPress('ArrowLeft')}><ArrowLeft size={16}/></KeypadButton></div>
        <div className="flex flex-col items-center">
            <KeypadButton onClick={() => onKeyPress('ArrowUp')}><ArrowUp size={16}/></KeypadButton>
            <Button
              variant="default"
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg text-sm font-bold my-0.5"
              onClick={() => onKeyPress('Enter')}
            >
              OK
            </Button>
            <KeypadButton onClick={() => onKeyPress('ArrowDown')}><ArrowDown size={16}/></KeypadButton>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5 mt-1 place-items-center">
        {numKeys.map((key) => {
            let icon;
            if (key === '1') icon = <Grip className="w-3 h-3" />;
            if (key === '*') icon = <span className="text-xl">*</span>;
            if (key === '#') icon = <Delete className="w-4 h-4" />;
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
