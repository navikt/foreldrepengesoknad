/**
 * Felles filtreringslogikk for Sentry og Faro.
 *
 * Vi prøver å bruke samme regler for å luke bort støy der det er mulig:
 * - Dekoratør-feil (personbruker/decorator-next)
 * - Nettleserutvidelser (taleassistenter)
 *
 * Sentry har i tillegg filter for oversettelsesverktøy (removeChild/insertBefore).
 * 401-filtrering holdes i hver init-fil siden mekanismen er ulik (Sentry har breadcrumbs, Faro har ikke).

const FEIL_VI_VIL_LUKE_BORT = ['personbruker/decorator-next'];

export const DISTRIBUTOR_PATTERN = /Request timeout \S*Distributor\.\S+/;

export const DOM_OVERSETTELSE_FEIL = /(removeChild|insertBefore)[\s\S]*not a child of this node/i;

export interface StackFrame {
    filename?: string;
    function?: string;
}

/**
 * Sjekker om stackframes mangler opprinnelse i vår kode.
 *
 * Logikk: Hvis en frame er fra et asset (FARO: `/assets/*.js`) og matcher
 * FEIL_VI_VIL_LUKE_BORT, er det en uønsket asset-frame → return true (filtrer).
 * Hvis framen er fra våre egne assets (ikke i FEIL_VI_VIL_LUKE_BORT) → return false (ikke filtrer).
 * Hvis framen ikke er et asset (vår kode) → return true (ikke filtrer — her har vi opprinnelse).
 *
 * Funksjonen returnerer true hvis minst én frame ikke har opprinnelse i vår kode,
 * eller hvis en frame kommer fra en uønsket asset.
 */
export const harUtenforstaendeKodeOpprinnelse = (frames: StackFrame[]): boolean => {
    return frames.some((frame) => {
        const assetFrame = frame.filename && /\/assets\/.*\.js$/.test(frame.filename);

        if (assetFrame) {
            const erUønsketAssetFrame = FEIL_VI_VIL_LUKE_BORT.some((feil) => frame.filename?.includes(feil));
            if (erUønsketAssetFrame) {
                return true;
            }
            return false;
        }
        return true;
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
