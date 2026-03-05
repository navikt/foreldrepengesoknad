import { useEffect, useState } from 'react';

const getInitialMatch = (media: string, fallback: boolean): boolean => {
    if (typeof globalThis === 'undefined' || !globalThis.matchMedia) {
        return fallback;
    }
    return globalThis.matchMedia(media).matches;
};

/**
 * @example useMedia("screen and (min-width: 1024px)")
 * @param media string
 * @param fallback boolean
 * @returns boolean | undefined
 */
export const useMedia = (media: string, fallback = false): boolean => {
    const [matches, setMatches] = useState(() => getInitialMatch(media, fallback));

    useEffect(() => {
        if (typeof globalThis === 'undefined' || !globalThis.matchMedia) {
            return;
        }

        const mediaQueryList = globalThis.matchMedia(media);

        const listener = (evt: MediaQueryListEvent) => {
            setMatches(evt.matches);
        };

        mediaQueryList.addEventListener('change', listener);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, [media]);

    return matches;
};
