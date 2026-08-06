/**
 * Felles filtreringslogikk for Sentry og Faro.
 *
 * Vi prøver å bruke samme regler for å luke bort støy der det er mulig:
 * - Dekoratør-feil (personbruker/decorator-next)
 * - Nettleserutvidelser (taleassistenter)
 *
 * Sentry har i tillegg filter for oversettelsesverktøy (removeChild/insertBefore).
 * 401-filtrering holdes i hver init-fil siden mekanismen er ulik (Sentry har breadcrumbs, Faro har ikke).
 */

const FEIL_VI_VIL_LUKE_BORT = ['personbruker/decorator-next', 'personbruker/nav-dekoratoren'];

export const DISTRIBUTOR_PATTERN = /Request timeout \S*Distributor\.\S+/;

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
 * Sjekker om stackframes inneholder Distributor-mønster fra taleassistent-utvidelser.
 */
export const harDistributorStacktrace = (frames: StackFrame[]): boolean => {
    return frames.some(
        (frame) =>
            (frame.filename && DISTRIBUTOR_PATTERN.test(frame.filename)) ||
            (frame.function && DISTRIBUTOR_PATTERN.test(frame.function)),
    );
};
