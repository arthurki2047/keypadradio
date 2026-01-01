"use client";

import { Screen } from './screen';
import { useKeypad } from '@/hooks/use-keypad';
import { Clock } from './clock';

type PhoneProps = ReturnType<typeof useKeypad>;

export function Phone(props: PhoneProps) {
    return (
        <div className="relative mx-auto h-[480px] w-[280px] rounded-[30px] border-[10px] border-neutral-800 bg-neutral-800 shadow-2xl dark:border-neutral-900 dark:bg-neutral-900 flex flex-col">
            <div className="h-full w-full overflow-hidden rounded-[20px] bg-background flex flex-col">
                <div className="w-full h-8 bg-neutral-800 dark:bg-neutral-900 flex justify-between items-center px-4">
                    <div className="w-16 h-1.5 bg-neutral-700 rounded-full"></div>
                    <Clock />
                </div>
                <Screen {...props} />
            </div>
        </div>
    );
}
