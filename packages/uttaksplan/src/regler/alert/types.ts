/**
 * Stedene i uttaksplan-pakken der en alert kan vises. Brukt både til
 * dokumentasjon i Storybook og som en semantisk peker fra katalogen
 * til faktiske komponenter.
 */
export type Visningsstad =
    | 'uttaksplan-liste'
    | 'uttaksplan-kalender'
    | 'legg-til-endre-skjema'
    | 'eksisterande-valgte-perioder'
    | 'periode-detaljar-redigering'
    | 'forskyv-eller-erstatt';

/** Menneskelig lesbar tekst for hver visningsstad. */
export const VISNINGSSTAD_LABELS: Record<Visningsstad, string> = {
    'uttaksplan-liste': 'Over listevisningen av uttaksplanen',
    'uttaksplan-kalender': 'Over kalendervisningen av uttaksplanen',
    'legg-til-endre-skjema': 'I skjemaet for å legge til eller endre periode',
    'eksisterande-valgte-perioder': 'Inne i hver valgte eksisterende periode i kalender-redigering',
    'periode-detaljar-redigering': 'I detaljvisning av valgte eksisterende perioder',
    'forskyv-eller-erstatt': 'I forskyv- og erstatt-panelene',
};

/**
 * Felles metadata for en alert — det som beskriver regelen uten å
 * inkludere runtime-logikk. Brukt direkte for alerter som lever som
 * ren dokumentasjon, og som basis for `Alertregel<TKontekst>` for
 * alerter som også har trigger-logikk i katalogen.
 *
 * `type` skiller mellom:
 * - `blokkerande`: Erstatter hele skjemaet (early return).
 * - `kontekstuell`: Dukker opp inne i skjemaet/visningen som ekstra info.
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
 *   (for regler med flere meldingsvarianter, f.eks. per familiesituasjon).
 * - `meldingIder` er den fullstendige listen over mulige meldinger —
 *   brukt til dokumentasjon i Storybook, ikke til runtime-logikk.
 */
export type Alertregel<TKontekst> = AlertregelDoc & {
    getMeldingId: (kontekst: TKontekst) => string;
    skalVises: (kontekst: TKontekst) => boolean;
};

/**
 * En samling alertregler innenfor ett funksjonelt område —
 * brukt både til visningslogikk og til å autogenerere
 * Storybook-dokumentasjon.
 */
export type Alertområde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: readonly AlertregelDoc[];
};
