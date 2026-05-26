import type { ReactNode } from 'react';

/**
 * Stedene i uttaksplan-pakken der en alert kan vises. Brukt både til
 * dokumentasjon i Storybook og som en semantisk peker fra katalogen
 * til faktiske komponenter.
 */
export type Visningssted =
    | 'uttaksplan-liste'
    | 'uttaksplan-kalender'
    | 'legg-til-endre-skjema'
    | 'eksisterende-valgte-perioder'
    | 'periode-detaljer-redigering'
    | 'forskyv-eller-erstatt';

/** Menneskelig lesbar tekst for hver visningsstad. */
export const VISNINGSSTED_LABELS: Record<Visningssted, string> = {
    'uttaksplan-liste': 'Over listevisningen av uttaksplanen',
    'uttaksplan-kalender': 'Over kalendervisningen av uttaksplanen',
    'legg-til-endre-skjema': 'I skjemaet for å legge til eller endre periode',
    'eksisterende-valgte-perioder': 'Inne i hver valgte eksisterende periode i kalender-redigering',
    'periode-detaljer-redigering': 'I detaljvisning av valgte eksisterende perioder',
    'forskyv-eller-erstatt': 'I forskyv- og erstatt-panelene',
};

/**
 * Ferdig pakket alert for visning — ferdig melding-node + variant.
 * Brukes som returtype fra alert-hooker for å gi konsumentene en
 * uniform shape uavhengig av hvilken regel som slo inn.
 */
export type AktivAlertMetadata = { melding: ReactNode; variant: 'info' | 'warning' };

/**
 * Felles metadata for en alert — det som beskriver regelen uten å
 * inkludere runtime-logikk. Brukt direkte for alerter som lever som
 * ren dokumentasjon, og som basis for `Alertregel<TKontekst>` for
 * alerter som også har trigger-logikk i katalogen.
 *
 * `type` skiller mellom:
 * - `blokkerande`: Erstatter hele skjemaet (early return).
 * - `kontekstuell`: Dukker opp inne i skjemaet/visningen som ekstra info.
 *
 * `meldinger` er den fullstendige listen over mulige meldinger
 * regelen kan vise. Den brukes både til dokumentasjon i Storybook og
 * som default runtime-melding for regler med kun én variant
 * (`meldinger[0]`). Regler med flere meldingsvarianter må sette
 * `getMelding` for å velge riktig melding for konteksten.
 */
export type AlertregelDoc = {
    id: string;
    beskrivelse: string;
    visningssteder: readonly Visningssted[];
    meldinger: readonly ReactNode[];
    variant: 'info' | 'warning';
    type: 'blokkerende' | 'kontekstuell';
};

/**
 * En regel som bestemmer om en informasjonsmelding (Alert/InlineMessage)
 * skal vises. Alertregler er rene data — betingelsen er en funksjon, men
 * all tekst og metadata er tilgjengelig for dokumentasjon.
 *
 * - `skalVises` avgjør om regelen slår inn.
 * - `getMelding` velger riktig melding-node for konteksten. For regler
 *   med kun én melding returnerer den `meldinger[0]` — bruk
 *   `lagAlertregel` så blir denne defaulten satt automatisk.
 */
export type Alertregel<TKontekst> = AlertregelDoc & {
    getMelding: (kontekst: TKontekst) => ReactNode;
    skalVises: (kontekst: TKontekst) => boolean;
};

/**
 * Lag en `Alertregel` der `getMelding` defaulter til `meldinger[0]`
 * når regelen har én meldingsvariant. Brukes for å unngå å skrive
 * samme melding to ganger på statiske regler.
 */
export const lagAlertregel = <TKontekst>(
    spec: Omit<Alertregel<TKontekst>, 'getMelding'> & { getMelding?: (kontekst: TKontekst) => ReactNode },
): Alertregel<TKontekst> => ({
    ...spec,
    getMelding: spec.getMelding ?? (() => spec.meldinger[0]),
});

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
