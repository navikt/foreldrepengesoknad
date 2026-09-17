/**
 * Felles filtreringslogikk for Faro.
 *
 * Vi prøver å bruke samme regler for å luke bort støy der det er mulig:
 * - Dekoratør-feil (personbruker/decorator-next)
 * - Nettleserutvidelser (taleassistenter)
 *
 * Filtrene luker blant annet bort feil fra oversettelsesverktøy (removeChild/insertBefore).
 */

const FEIL_VI_VIL_LUKE_BORT = ['personbruker/decorator-next', 'personbruker/nav-dekoratoren'];

/**
 * Fanger opp "Request timeout ..."-feil fra nettleserutvidelser generelt, ikke bare
 * taleassistenter (Distributor.getValue). Microsoft Editor (stavekontroll/redigering-tillegget
 * i Edge) genererer f.eks. "Request timeout isPredictionAvailable", "Request timeout isMathOcrAvailable",
 * "Request timeout isDictateAvailable", "Request timeout getDictionariesByLanguageId" og
 * "Request timeout DefineExpirationForLanguagePacks.getValue".
 */
export const BROWSER_EXTENSION_TIMEOUT_PATTERN = /Request timeout \S+/;

export const DOM_OVERSETTELSE_FEIL = /(removeChild|insertBefore)[\s\S]*not a child of this node/i;

export interface StackFrame {
    filename?: string;
    function?: string;
}

/**
 * Sjekker om stackframes mangler opprinnelse i vår kode.
 *
 * Logikk: Hvis en frame kommer fra dekoratøren (filnavnet inneholder noe fra
 * FEIL_VI_VIL_LUKE_BORT, uavhengig av filtype/plassering) → return true (filtrer).
 * Dette fanger opp alt fra dekoratøren, ikke bare bundlede `/assets/*.js`-chunks
 * (f.eks. rå kildefiler som `personbruker/nav-dekoratoren/src/helpers/auth.ts`).
 * Hvis framen er fra vårt eget asset (FARO: `/assets/*.js`) → return false (ikke filtrer).
 * Hvis framen verken er fra dekoratøren eller vårt eget asset (altså ikke fra vår bundle) → return true (filtrer).
 *
 * Funksjonen returnerer true hvis minst én frame ikke har opprinnelse i vår kode,
 * eller hvis en frame kommer fra dekoratøren.
 */
export const harUtenforstaendeKodeOpprinnelse = (frames: StackFrame[]): boolean => {
    return frames.some((frame) => {
        const erDekoratørFrame = FEIL_VI_VIL_LUKE_BORT.some((feil) => frame.filename?.includes(feil));
        if (erDekoratørFrame) {
            return true;
        }

        const assetFrame = frame.filename && /\/assets\/.*\.js$/.test(frame.filename);
        return !assetFrame;
    });
};

/**
 * Sjekker om stackframes inneholder "Request timeout ..."-mønster fra nettleserutvidelser.
 */
export const harBrowserExtensionTimeoutStacktrace = (frames: StackFrame[]): boolean => {
    return frames.some(
        (frame) =>
            (frame.filename && BROWSER_EXTENSION_TIMEOUT_PATTERN.test(frame.filename)) ||
            (frame.function && BROWSER_EXTENSION_TIMEOUT_PATTERN.test(frame.function)),
    );
};
