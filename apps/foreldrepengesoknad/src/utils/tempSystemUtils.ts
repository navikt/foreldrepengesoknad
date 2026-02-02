export const isLocalhost = () => {
    const isVitest = typeof process !== 'undefined' && process.env.VITEST === 'true';
    return globalThis.location.hostname === 'localhost' && !isVitest;
};
