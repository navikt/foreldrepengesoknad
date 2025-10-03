import { useEffect, useState } from 'react';

const noMatchMedia = typeof globalThis !== 'undefined' && globalThis.matchMedia === undefined;

/**
 * @example useMedia("screen and (min-width: 1024px)")
 * @param media string
 * @param fallback boolean
 * @returns boolean | undefined
 */
export const useMedia = (media: string, fallback?: boolean): boolean | undefined => {
    const [matches, setMatches] = useState(fallback);

    useEffect(() => {
        if (noMatchMedia) {
            return;
        }
        const mediaQueryList = globalThis.matchMedia(media);

        setMatches(mediaQueryList.matches);

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
