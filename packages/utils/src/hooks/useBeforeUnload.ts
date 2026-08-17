import { useEffect, useRef } from 'react';

export const useBeforeUnload = (fn: () => void) => {
    const cbRef = useRef(fn);

    useEffect(() => {
        cbRef.current = fn;
    }, [fn]);

    useEffect(() => {
        globalThis.addEventListener('beforeunload', cbRef.current);

        return () => globalThis.removeEventListener('beforeunload', cbRef.current);
    }, []);
};
