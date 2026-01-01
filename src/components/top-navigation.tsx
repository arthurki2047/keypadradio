"use client";

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TopNavigationProps {
  onKeyPress: (key: string) => void;
}

export function TopNavigation({ onKeyPress }: TopNavigationProps) {

  const NavButton = ({
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
      className={`h-10 w-10 text-lg rounded-full font-bold text-foreground/80 hover:bg-primary/20 focus:bg-primary/30 active:scale-95 transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <div className="flex justify-between items-center p-1 border-b">
        <NavButton onClick={() => onKeyPress('ArrowLeft')}><ArrowLeft size={20}/></NavButton>
        <Button
            variant="default"
            className="h-10 w-20 rounded-full bg-primary text-primary-foreground shadow-lg text-base font-bold"
            onClick={() => onKeyPress('Enter')}
        >
            OK
        </Button>
        <NavButton onClick={() => onKeyPress('ArrowRight')}><ArrowRight size={20} /></NavButton>
    </div>
  );
}
