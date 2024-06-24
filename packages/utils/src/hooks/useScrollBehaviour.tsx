import { useEffect, useRef, useState } from 'react';

export const useScrollBehaviour = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [scrollCounter, setScrollCounter] = useState(0);

    const scrollToBottom = () => setScrollCounter(scrollCounter + 1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (ref.current && scrollCounter > 0) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [scrollCounter]);

    return { ref, scrollToBottom };
};

export default useScrollBehaviour;
