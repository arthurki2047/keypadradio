"use client";

import { Screen } from './screen';
import { Keypad } from './keypad';
import { useKeypad } from '@/hooks/use-keypad';

type PhoneProps = ReturnType<typeof useKeypad>;

export function Phone(props: PhoneProps) {
    return (
        <div className="relative mx-auto h-[700px] w-[350px] rounded-[40px] border-[10px] border-neutral-800 bg-neutral-800 shadow-2xl dark:border-neutral-900 dark:bg-neutral-900">
            <div className="h-full w-full overflow-hidden rounded-[30px] bg-background flex flex-col">
                <div className="w-full h-6 bg-neutral-800 dark:bg-neutral-900 flex justify-center items-end pb-1">
                    <div className="w-20 h-2 bg-neutral-700 rounded-full"></div>
                </div>
                <Screen {...props} />
                <Keypad onKeyPress={props.handleKeyPress} />
            </div>
        </div>
    );
}
