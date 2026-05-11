import { useEffect, useRef, useState } from 'react';

export const useScrollBehaviour = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollCounter, setScrollCounter] = useState(0);

    const scrollToBottom = () => setScrollCounter(scrollCounter + 1);

    useEffect(() => {
        globalThis.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (scrollRef.current && scrollCounter > 0) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [scrollCounter]);

    return { ref: scrollRef, scrollToBottom };
};
