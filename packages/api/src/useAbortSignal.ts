import { useCallback, useEffect, useRef } from 'react';

const useAbortSignal = () => {
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(
        () => () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        },
        [],
    );

    const initAbortSignal = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const newAbortController = new AbortController();
        abortControllerRef.current = newAbortController;

        return abortControllerRef.current.signal;
    }, [abortControllerRef]);

    return { initAbortSignal };
};

export default useAbortSignal;
