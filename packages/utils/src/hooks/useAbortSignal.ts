import { useEffect, useRef } from 'react';

export const useAbortSignal = () => {
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(
        () => () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        },
        [],
    );

    const initAbortSignal = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const newAbortController = new AbortController();
        abortControllerRef.current = newAbortController;

        return abortControllerRef.current.signal;
    };

    return { initAbortSignal };
};
