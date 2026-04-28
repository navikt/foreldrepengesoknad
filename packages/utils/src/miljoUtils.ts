/**
 * Returnerer `true` dersom appen kjøres lokalt eller i dev-miljø (www.intern.dev.nav.no).
 * Brukes for å gate funksjonalitet som ikke skal være aktiv i produksjon.
 */
export const erLokaltEllerDev = (): boolean => {
    if (typeof globalThis === 'undefined' || !globalThis.location) {
        return false;
    }
    return globalThis.location.hostname === 'localhost' || globalThis.location.hostname === 'www.intern.dev.nav.no';
};
