import type { Stacktrace } from '@sentry/browser';

/**
 * Typen til sentry har ikke denne. Men inspiserer man payloads i sentry ser vi at den sendes ved.
 * Har trolig med at vi bruker sourcemaps som gjør om original stacktrace
 */
declare module '@sentry/browser' {
    interface Exception {
        raw_stacktrace?: Stacktrace;
    }
}
