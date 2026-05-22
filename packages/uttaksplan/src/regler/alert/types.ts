/**
 * Stadane i uttaksplan-pakken der ein alert kan visast. Brukt både til
 * dokumentasjon i Storybook og som ein semantisk peikar frå katalogen
 * til faktiske komponentar.
 */
export type Visningsstad =
    | 'uttaksplan-liste'
    | 'uttaksplan-kalender'
    | 'legg-til-endre-skjema'
    | 'eksisterande-valgte-perioder'
    | 'periode-detaljar-redigering'
    | 'forskyv-eller-erstatt';

/** Menneskeleg lesbar tekst for kvar visningsstad. */
export const VISNINGSSTAD_LABELS: Record<Visningsstad, string> = {
    'uttaksplan-liste': 'Over listevisninga av uttaksplanen',
    'uttaksplan-kalender': 'Over kalendervisninga av uttaksplanen',
    'legg-til-endre-skjema': 'I skjemaet for å leggje til eller endre periode',
    'eksisterande-valgte-perioder': 'Inne i kvar valgt eksisterande periode i kalender-redigering',
    'periode-detaljar-redigering': 'I detaljvisning av valgte eksisterande periodar',
    'forskyv-eller-erstatt': 'I forskyv- og erstatt-panela',
};

/**
 * Felles metadata for ein alert — det som beskriv regelen utan å
 * inkludere runtime-logikk. Brukt direkte for alertar som lever som
 * rein dokumentasjon, og som basis for `Alertregel<TKontekst>` for
 * alertar som og har trigger-logikk i katalogen.
 *
 * `type` skil mellom:
 * - `blokkerande`: Erstattar heile skjemaet (early return).
 * - `kontekstuell`: Dukkar opp inne i skjemaet/visninga som ekstra info.
 */
export type AlertregelDoc = {
    id: string;
    beskrivelse: string;
    visningsstader: readonly Visningsstad[];
    meldingIder: readonly string[];
    variant: 'info' | 'warning';
    type: 'blokkerande' | 'kontekstuell';
};

/**
 * En regel som bestemmer om en informasjonsmelding (Alert/InlineMessage)
 * skal vises. Alertregler er rene data — betingelsen er en funksjon, men
 * all tekst og metadata er tilgjengelig for dokumentasjon.
 *
 * - `skalVises` avgjør om regelen slår inn.
 * - `getMeldingId` returnerer riktig intl-nøkkel for konteksten
 *   (for reglar med fleire meldingsvarianter, t.d. per familiesituasjon).
 * - `meldingIder` er den fullstendige lista over moglege meldingar —
 *   brukt til dokumentasjon i Storybook, ikkje til runtime-logikk.
 */
export type Alertregel<TKontekst> = AlertregelDoc & {
    getMeldingId: (kontekst: TKontekst) => string;
    skalVises: (kontekst: TKontekst) => boolean;
};

/**
 * En samling alertregler innanfor eitt funksjonelt område —
 * brukt både til visningslogikk og til å autogenerere
 * Storybook-dokumentasjon.
 */
export type Alertområde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: readonly AlertregelDoc[];
};
