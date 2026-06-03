export type Periode = { fom: string; tom: string };

/**
 * Konvensjonen for predicate-navn på tvers av regelkatalogene:
 * - `erBrutt`  — validering/felt: regelen blir vist som **feilmelding** når den slår inn.
 * - `skalVises` — synlighet/alert: regelen avgjør om noe blir **rendret**.
 * - `erGyldig`  — kvotetype: regelen avgjør om et alternativ er **lovlig å velge**.
 *
 * Tre ulike navn fordi semantikken er ulik — same navn ville gjort det
 * vanskeligere å lese ved bruk (`if (regel.skalVises(...))` vs
 * `if (regel.erBrutt(...))`).
 */

/**
 * Doc-typen for en feltregel — alt som beskriver regelen uten å inkludere
 * runtime-logikk. Brukt direkte i Storybook-katalogen og som basis for
 * `Feltregel<TInput>`.
 */
type FeltregelDoc = {
    id: string;
    beskrivelse: string;
    feilmelding: string;
};

/**
 * En regel for ett enkelt skjemafelt (kjøres av React Hook Form på input-nivå).
 * - `beskrivelse` er klartekst for designer/PO/saksbehandler.
 * - `erBrutt` får en samlet input (feltverdi + avhengige verdier) og returnerer
 *   `true` om regelen er brutt.
 * - `feilmelding` er ferdig formatert tekst som blir vist til brukeren.
 */
export type Feltregel<TInput> = FeltregelDoc & {
    erBrutt: (input: TInput) => boolean;
};

/**
 * En samling av feltregler for ett konkret skjemafelt — brukt både til
 * validering og til å generere dokumentasjon.
 */
export type Feltregelområde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: readonly FeltregelDoc[];
};

/** Returnerer første feltregel som er brutt, eller undefined. */
export const førsteBrutteFeltregel = <TInput>(
    regler: ReadonlyArray<Feltregel<TInput>>,
    input: TInput,
): Feltregel<TInput> | undefined => regler.find((regel) => regel.erBrutt(input));
