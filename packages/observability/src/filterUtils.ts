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

const FRAME_UTEN_FIL = /^(<anonymous>|native|\[native code\])?$/;

/**
 * Sjekker om stackframes mangler opprinnelse i vår kode.
 *
 * Logikk: Hvis en frame kommer fra dekoratøren (filnavnet inneholder noe fra
 * FEIL_VI_VIL_LUKE_BORT, uavhengig av filtype/plassering) → return true (filtrer).
 * Dette fanger opp alt fra dekoratøren, ikke bare bundlede `/assets/*.js`-chunks
 * (f.eks. rå kildefiler som `personbruker/nav-dekoratoren/src/helpers/auth.ts`).
 *
 * Frames uten fil (`<anonymous>`, native, tomt filnavn) sier ingenting om opprinnelse og ignoreres,
 * ellers ville f.eks. `Array.map (<anonymous>)` skjult feil i vår kode.
 * Av de gjenværende framene: finnes minst én fra vårt eget asset (`/assets/*.js`) → return false (ikke filtrer).
 * Finnes ingen → return true (filtrer). Er det ingen frames med fil, kan vi ikke avgjøre
 * opprinnelsen, og feilen beholdes.
 */
export const harUtenforstaendeKodeOpprinnelse = (frames: StackFrame[]): boolean => {
    const erDekoratørFeil = frames.some((frame) =>
        FEIL_VI_VIL_LUKE_BORT.some((feil) => frame.filename?.includes(feil)),
    );
    if (erDekoratørFeil) {
        return true;
    }

    const filnavn = frames
        .map((frame) => frame.filename ?? '')
        .filter((filename) => !FRAME_UTEN_FIL.test(filename));
    if (filnavn.length === 0) {
        return false;
    }

    return !filnavn.some((filename) => /\/assets\/.*\.js$/.test(filename));
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
