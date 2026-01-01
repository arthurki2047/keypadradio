
"use client";

import { Screen } from './screen';
import { useKeypad } from '@/hooks/use-keypad';
import { Clock } from './clock';
import { TouchControls } from './touch-controls';
import { Power } from 'lucide-react';

type PhoneProps = ReturnType<typeof useKeypad>;

export function Phone(props: PhoneProps) {
    return (
        <div className="relative mx-auto h-[600px] w-[300px] rounded-[40px] border-[10px] border-neutral-800 bg-neutral-800 shadow-2xl dark:border-neutral-900 dark:bg-neutral-900 flex flex-col">
            <div className="h-full w-full overflow-hidden rounded-[30px] bg-background flex flex-col">
                <div className="w-full h-8 bg-neutral-800 dark:bg-neutral-900 flex justify-between items-center px-4">
                    <div className="w-16 h-1.5 bg-neutral-700 rounded-full"></div>
                    <Clock />
                </div>
                <div className="flex-1 w-full bg-background overflow-hidden relative">
                    {props.isScreenOn ? (
                        <Screen {...props} />
                    ) : (
                        <div className="w-full h-full bg-black flex flex-col items-center justify-center text-neutral-500">
                            <Power className="w-16 h-16 mb-4" />
                            <p className="text-sm">Screen is off</p>
                            <p className="text-xs mt-2">Press any key to wake</p>
                        </div>
                    )}
                </div>
                <TouchControls onKeyPress={props.handleKeyPress} />
            </div>
        </div>
    );
}
