import { useEffect, useRef } from 'react';

const useBeforeUnload = (fn: () => void) => {
    const cb = useRef(fn);

    useEffect(() => {
        cb.current = fn;
    }, [fn]);

    useEffect(() => {
        window.addEventListener('beforeunload', cb.current);

        return () => window.removeEventListener('beforeunload', cb.current);
    }, []);
};

export default useBeforeUnload;
