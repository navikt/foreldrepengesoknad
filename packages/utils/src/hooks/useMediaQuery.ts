import { useCallback, useSyncExternalStore } from 'react';

const harMatchMedia = () => typeof globalThis !== 'undefined' && !!globalThis.matchMedia;

/**
 * @example useMediaQuery("screen and (min-width: 1024px)")
 * @param media string
 * @param fallback boolean
 * @returns boolean
 */
export const useMediaQuery = (media: string, fallback = false): boolean => {
    const subscribe = useCallback(
        (onChange: () => void) => {
            if (!harMatchMedia()) {
                return () => {};
            }
            const mediaQueryList = globalThis.matchMedia(media);
            mediaQueryList.addEventListener('change', onChange);
            return () => mediaQueryList.removeEventListener('change', onChange);
        },
        [media],
    );

    const getSnapshot = () => (harMatchMedia() ? globalThis.matchMedia(media).matches : fallback);

    return useSyncExternalStore(subscribe, getSnapshot, () => fallback);
};
