/**
 * En regel som bestemmer om en informasjonsmelding (Alert/InlineMessage)
 * skal vises i skjemaet. Alertregler er rene data — betingelsen er en
 * funksjon, men all tekst og metadata er tilgjengelig for dokumentasjon.
 *
 * - `skalVises` avgjør om regelen slår inn.
 * - `getMeldingId` returnerer riktig intl-nøkkel for konteksten
 *   (for reglar med fleire meldingsvarianter, t.d. per familiesituasjon).
 * - `meldingIder` er den fullstendige lista over moglege meldingar —
 *   brukt til dokumentasjon i Storybook, ikkje til runtime-logikk.
 *
 * `type` skiller mellom:
 * - `blokkerande`: Hele skjemaet erstattes av meldingen (early return).
 * - `kontekstuell`: Meldingen dukker opp inne i skjemaet som ekstra info.
 */
export type Alertregel<TKontekst> = {
    id: string;
    beskrivelse: string;
    meldingIder: readonly string[];
    getMeldingId: (kontekst: TKontekst) => string;
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
    regler: ReadonlyArray<Omit<Alertregel<unknown>, 'skalVises' | 'getMeldingId'>>;
};
