import { act, cleanup, renderHook } from '@testing-library/react';

import { useBreakpoints } from '@navikt/fp-utils';

describe('useBreakpoints', () => {
    let width: number;
    let listeners: Set<() => void>;

    beforeEach(() => {
        width = 0;
        listeners = new Set();
        const minWidths = new Map([
            ['screen and (min-width: 480px)', 480],
            ['screen and (min-width: 768px)', 768],
        ]);

        vi.stubGlobal('matchMedia', (query: string) => {
            const minWidth = minWidths.get(query);
            if (minWidth === undefined) {
                throw new Error(`Unexpected media query: ${query}`);
            }

            return {
                get matches() {
                    return width >= minWidth;
                },
                addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
                removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
            };
        });
    });

    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
    });

    it.each([
        [479, false, false],
        [480, true, false],
        [767, true, false],
        [768, true, true],
        [1280, true, true],
    ])('matches inclusive minimum widths at %i px', (viewportWidth, isAtLeast480px, isAtLeast768px) => {
        width = viewportWidth;

        const { result } = renderHook(() => useBreakpoints());

        expect(result.current).toEqual({ isAtLeast480px, isAtLeast768px });
    });

    it('updates both breakpoints when the viewport grows and shrinks', () => {
        const { result } = renderHook(() => useBreakpoints());

        act(() => {
            width = 768;
            listeners.forEach((listener) => listener());
        });

        expect(result.current).toEqual({ isAtLeast480px: true, isAtLeast768px: true });

        act(() => {
            width = 479;
            listeners.forEach((listener) => listener());
        });

        expect(result.current).toEqual({ isAtLeast480px: false, isAtLeast768px: false });
    });

    it('removes subscriptions on unmount', () => {
        const { unmount } = renderHook(() => useBreakpoints());

        expect(listeners.size).toBe(2);

        unmount();

        expect(listeners.size).toBe(0);
    });

    it('returns false when matchMedia is unavailable', () => {
        vi.stubGlobal('matchMedia', undefined);

        const { result } = renderHook(() => useBreakpoints());

        expect(result.current).toEqual({ isAtLeast480px: false, isAtLeast768px: false });
    });
});
