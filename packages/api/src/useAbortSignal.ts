import { useEffect, useRef } from 'react';

const useAbortSignal = () => {
    const controller = useRef<AbortController>(new AbortController());

    useEffect(() => {
        return () => {
            controller.current.abort();
        };
    }, []);

    return controller.current.signal;
};

export default useAbortSignal;
