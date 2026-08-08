
"use client";

import { Screen } from './screen';
import { useKeypad } from '@/hooks/use-keypad';
import { cn } from '@/lib/utils';

type PhoneProps = ReturnType<typeof useKeypad>;

export function Phone(props: PhoneProps) {
  const { isScreenOn, handleKeyPress } = props;

  return (
    <div className="relative mx-auto w-[300px] h-[540px] rounded-[40px] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl flex flex-col overflow-hidden select-none">
      {/* Top Earpiece / Sensor Area */}
      <div className="w-full h-8 flex justify-center items-center bg-neutral-900">
        <div className="w-14 h-1.5 bg-neutral-800 rounded-full shadow-inner" />
      </div>

      {/* Main Display Area */}
      <div className="flex-1 relative w-full overflow-hidden bg-black">
        {/* The active interface - hidden completely when off */}
        <div className={cn(
          "w-full h-full transition-all duration-700 ease-in-out",
          !isScreenOn && "brightness-0 opacity-0 pointer-events-none"
        )}>
          <Screen {...props} />
        </div>

        {/* The "Off" screen overlay - simulates physical blackout */}
        {!isScreenOn && (
          <div 
            className="absolute inset-0 z-50 bg-black cursor-pointer active:bg-neutral-950 transition-colors"
            onClick={() => handleKeyPress('Wake')}
            title="Press any key to wake"
          >
            {/* Deep black void simulating a powered-off LCD */}
          </div>
        )}
      </div>

      {/* Bottom Decorative Element / Home Indicator Area */}
      <div className="w-full h-8 bg-neutral-900 flex justify-center items-center">
        <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full opacity-50" />
      </div>
    </div>
  );
}
