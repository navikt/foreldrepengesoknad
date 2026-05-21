/**
 * En regel som bestemmer om en informasjonsmelding (Alert/InlineMessage)
 * skal vises i skjemaet. Alertregler er rene data — betingelsen er en
 * funksjon, men all tekst og metadata er tilgjengelig for dokumentasjon.
 *
 * `type` skiller mellom:
 * - `blokkerande`: Hele skjemaet erstattes av meldingen (early return).
 * - `kontekstuell`: Meldingen dukker opp inne i skjemaet som ekstra info.
 */
export type Alertregel<TKontekst> = {
    id: string;
    beskrivelse: string;
    meldingIder: readonly string[];
    variant: 'info' | 'warning';
    type: 'blokkerande' | 'kontekstuell';
    skalVises: (kontekst: TKontekst) => boolean;
};

/**
 * En samling alertregler innenfor ett område av skjemaet —
 * brukt både til visningslogikk og til å autogenerere
 * Storybook-dokumentasjon.
 */
export type Alertområde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: ReadonlyArray<Omit<Alertregel<unknown>, 'skalVises'>>;
};
