import { useEffect, useRef } from 'react';

export const useScrollIntoViewWhenAdded = (antall: number) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const forrigeAntallRef = useRef(antall);

    useEffect(() => {
        // Scroll først etter at den nye oppsummeringsboksen er rendret fra ekstern state.
        // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
        if (antall > forrigeAntallRef.current) {
            elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        forrigeAntallRef.current = antall;
    }, [antall]);

    return elementRef;
};
