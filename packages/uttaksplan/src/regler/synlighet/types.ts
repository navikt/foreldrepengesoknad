/**
 * En regel for å avgjøre om noe skal vises i skjemaet — et felt, en
 * radioknapp, eller en infoboks. Reglene er rene funksjoner som tar imot
 * en kontekst (relevant skjemastatus + bakgrunnsdata) og returnerer en
 * boolean.
 *
 * `beskrivelse` skal være klartekst på bokmål som forklarer regelen for
 * en designer, produkteier eller saksbehandler.
 */
export type Synlighetsregel<TKontekst> = {
    id: string;
    beskrivelse: string;
    skalVises: (kontekst: TKontekst) => boolean;
};

/**
 * En samling synlighetsregler innenfor ett område av skjemaet —
 * brukt både til selve visningslogikken og til å autogenerere
 * Storybook-dokumentasjon.
 */
export type Synlighetskapittel = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: ReadonlyArray<Omit<Synlighetsregel<unknown>, 'skalVises'>>;
};
