export const isLocalhostOrDev = () => {
    return globalThis.location.hostname === 'localhost' || globalThis.location.hostname === 'www.intern.dev.nav.no';
};
