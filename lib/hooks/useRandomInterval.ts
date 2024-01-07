import { random } from '@/lib/utils'
import React from 'react'

// https://www.joshwcomeau.com/snippets/react-hooks/use-random-interval/


// THIS IS A HACKATHON. I DO NOT CARE ABOUT TYPES. I COPIED THIS CODE FROM A WEBSITE THAT USED JS
// I CONVERTED IT TO TS. I DO NOT CARE ANYMORE
export const useRandomInterval = (callback: any, minDelay: number | null, maxDelay?: number | null) => {
    const timeoutId = React.useRef(null) as any;
    const savedCallback = React.useRef(callback);
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    React.useEffect(() => {
        let isEnabled =
            typeof minDelay === 'number' && typeof maxDelay === 'number';
        if (isEnabled) {
            const handleTick = () => {
                const nextTickAt = random(minDelay as number, maxDelay as number);
                timeoutId.current = window.setTimeout(() => {
                    savedCallback.current();
                    handleTick();
                }, nextTickAt);
            };
            handleTick();
        }
        return () => window.clearTimeout(timeoutId.current);
    }, [minDelay, maxDelay]);
    const cancel = React.useCallback(function () {
        window.clearTimeout(timeoutId.current);
    }, []);
    return cancel;
};