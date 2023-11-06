import { useEffect, useRef } from 'react';

const useAbortSignal = () => {
    const controller = useRef<AbortController>(new AbortController());

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            controller.current.abort();
        };
    }, []);

    return controller.current.signal;
};

export default useAbortSignal;
