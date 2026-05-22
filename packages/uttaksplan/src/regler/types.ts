/**
 * Identitetshjelper som markerer en streng som en intl-id. Brukt for at
 * intl-testene skal oppdage at id-en faktisk er i bruk i koden.
 */
export const i18n = (id: string): string => id;

export type Periode = { fom: string; tom: string };

/**
 * En regel for ett enkelt skjemafelt (kjøres av React Hook Form på input-nivå).
 *
 * - `beskrivelse` er klartekst som en saksbehandler eller designer kan lese
 *   for å forstå hva regelen handler om.
 * - `erBrutt` får en samlet input som inneholder feltverdien og eventuelle
 *   andre verdier regelen avhenger av, og returnerer `true` om regelen er brutt.
 * - `feilmeldingId` er intl-nøkkelen som blir vist til brukeren.
 */
export type Feltregel<TInput> = {
    id: string;
    beskrivelse: string;
    erBrutt: (input: TInput) => boolean;
    feilmeldingId: string;
};

/**
 * En samling av feltregler for ett konkret skjemafelt — brukt både til
 * validering og til å generere dokumentasjon.
 */
export type Feltregelområde = {
    id: string;
    feltnavn: string;
    beskrivelse: string;
    regler: ReadonlyArray<Omit<Feltregel<unknown>, 'erBrutt'>>;
};

/** Returnerer første feltregel som er brutt, eller undefined. */
export const førsteBrutteFeltregel = <TInput>(
    regler: ReadonlyArray<Feltregel<TInput>>,
    input: TInput,
): Feltregel<TInput> | undefined => regler.find((regel) => regel.erBrutt(input));
