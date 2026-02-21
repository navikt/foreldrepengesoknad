export const isLocalhostOrDev = () => {
    const isVitest = typeof process !== 'undefined' && process.env.VITEST === 'true';
    return (
        (globalThis.location.hostname === 'localhost' || globalThis.location.hostname === 'www.intern.dev.nav.no') &&
        !isVitest
    );
};
