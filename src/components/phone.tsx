
"use client";

import { Screen } from './screen';
import { useKeypad } from '@/hooks/use-keypad';
import { Power } from 'lucide-react';
import { Keypad } from './keypad';

type PhoneProps = ReturnType<typeof useKeypad>;

export function Phone(props: PhoneProps) {
    return (
        <div className="relative mx-auto h-[480px] w-[240px] rounded-[30px] border-[8px] border-neutral-800 bg-neutral-800 shadow-2xl dark:border-neutral-900 dark:bg-neutral-900 flex flex-col">
            <div className="h-full w-full overflow-hidden rounded-[22px] bg-background flex flex-col">
                <div className="w-full h-6 bg-neutral-800 dark:bg-neutral-900 flex justify-center items-center px-3">
                    <div className="w-12 h-1 bg-neutral-700 rounded-full"></div>
                </div>
                <div className="flex-1 w-full bg-background overflow-hidden relative">
                    {props.isScreenOn ? (
                        <Screen {...props} />
                    ) : (
                        <div className="w-full h-full bg-black flex flex-col items-center justify-center text-neutral-500">
                            <Power className="w-12 h-12 mb-2" />
                            <p className="text-xs">Screen is off</p>
                            <p className="text-[10px] mt-1">Press any key to wake</p>
                        </div>
                    )}
                </div>
                {/* <Keypad onKeyPress={props.handleKeyPress} /> */}
            </div>
        </div>
    );
}
