import { useEffect, useRef } from 'react';

export const useBeforeUnload = (fn: () => void) => {
    const cb = useRef(fn);

    useEffect(() => {
        cb.current = fn;
    }, [fn]);

    useEffect(() => {
        globalThis.addEventListener('beforeunload', cb.current);

        return () => globalThis.removeEventListener('beforeunload', cb.current);
    }, []);
};
