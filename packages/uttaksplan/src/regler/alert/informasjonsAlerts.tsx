import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FormattedMessage } from 'react-intl';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    RettighetType_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { kanMisteDagerVedEndringTilFerie } from '../../felles/uttaksplanValidatorer';
import { Uttaksplanperiode, UttaksplanperiodeMedKunTapteDager, erEøsUttakPeriode } from '../../types/UttaksplanPeriode';
import { harPeriodeDerMorsAktivitetIkkeErValgt, harPeriodeMedUkjentGraderingsaktivitet } from '../../utils/periodeUtils';
import { Periode } from '../types';
import { AlertregelDoc, lagAlertregel } from './types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

/* ----------------- Kontekst-typer ----------------- */

type MorsAktivitetListeKontekst = {
    rettighetType: RettighetType_fpoversikt;
    søker: BrukerRolleSak_fpoversikt;
    erIkkeSøkerSpesifisert: boolean;
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
};

type EksisterendeValgtePeriodeKontekst = {
    rettighetType: RettighetType_fpoversikt;
    søker: BrukerRolleSak_fpoversikt;
    erIkkeSøkerSpesifisert: boolean;
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager;
    morsUttakPerioder: readonly UttakPeriode_fpoversikt[];
};

type GraderingsaktivitetListeKontekst = {
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
    søker: BrukerRolleSak_fpoversikt;
};

type GraderingsaktivitetPeriodeKontekst = {
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager;
    søker: BrukerRolleSak_fpoversikt;
};

export type PeriodeDetaljerKontekst = {
    søker: BrukerRolleSak_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
    harPeriodeMedPleiepenger: boolean;
    harPeriodeFørFamiliehendelsedato: boolean;
};

export type ForskyvEllerErstattKontekst = {
    familiesituasjon: Familiesituasjon;
    harSenerePerioderSomErReadonly: boolean;
    harPeriodeFørSeksUkerEtterFamiliehendelsedato: boolean;
    harPeriodeFørFamiliehendelsedato: boolean;
};

/* ----------------- Felles helpers ----------------- */

const erIkkeAdopsjon = (familiesituasjon: Familiesituasjon) => familiesituasjon !== 'adopsjon';

/* ----------------- Regler ----------------- */

export const MANGLER_MORS_AKTIVITET_LISTE = lagAlertregel<MorsAktivitetListeKontekst>({
    id: 'informasjonsAlerts.manglerMorsAktivitetListe',
    beskrivelse:
        'Brukeren har én eller flere perioder som krever mors aktivitet, men ' +
        'aktiviteten er ikke valgt. Vises som en samlet melding over hele listen.',
    visningssteder: ['uttaksplan-liste'],
    meldinger: [
        <FormattedMessage key="UttaksplanListe.ManglerMorsAktivitet" id="UttaksplanListe.ManglerMorsAktivitet" />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, ctx.søker, ctx.erIkkeSøkerSpesifisert, [...ctx.perioder]),
});

export const MANGLER_MORS_AKTIVITET_KALENDER = lagAlertregel<MorsAktivitetListeKontekst>({
    id: 'informasjonsAlerts.manglerMorsAktivitetKalender',
    beskrivelse:
        'Brukeren har én eller flere perioder som krever mors aktivitet, men ' +
        'aktiviteten er ikke valgt. Vises samlet over hele kalenderen, sammen med ' +
        'lenke til informasjon om aktivitetskravet.',
    visningssteder: ['uttaksplan-kalender'],
    meldinger: [
        <FormattedMessage key="UttaksplanKalender.MarkertePerioder" id="UttaksplanKalender.MarkertePerioder" />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, ctx.søker, ctx.erIkkeSøkerSpesifisert, [...ctx.perioder]),
});

export const MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING = lagAlertregel<MorsAktivitetListeKontekst>({
    id: 'informasjonsAlerts.morsAktivitetIkkeOppgittRedigering',
    beskrivelse:
        'Vises i redigeringspanelene når brukeren har valgt perioder som krever mors ' +
        'aktivitet, men aktiviteten ikke er fylt ut. Vises både i kalender- og ' +
        'listeredigering for å minne om manglende valg før innsending.',
    visningssteder: ['legg-til-endre-skjema'],
    meldinger: [
        <FormattedMessage
            key="LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt"
            id="LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt"
        />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, ctx.søker, ctx.erIkkeSøkerSpesifisert, [...ctx.perioder]),
});

export const MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE = lagAlertregel<EksisterendeValgtePeriodeKontekst>({
    id: 'informasjonsAlerts.morsAktivitetIkkeValgtEksisterende',
    beskrivelse:
        'Vises ved hver valgte eksisterende periode i kalender-redigering når perioden ' +
        'krever mors aktivitet, men aktiviteten ikke er valgt. Synliggjør hvilke konkrete ' +
        'perioder som mangler valg.',
    visningssteder: ['eksisterende-valgte-perioder'],
    meldinger: [
        <FormattedMessage key="RedigeringPanel.MorsAktivitetIkkeValgt" id="RedigeringPanel.MorsAktivitetIkkeValgt" />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, ctx.søker, ctx.erIkkeSøkerSpesifisert, [ctx.periode, ...ctx.morsUttakPerioder]),
});

export const KAN_MISTE_DAGER = lagAlertregel<PeriodeDetaljerKontekst>({
    id: 'informasjonsAlerts.kanMisteDager',
    beskrivelse:
        'Mor har valgt å endre én eller flere perioder til ferie. Slik endring kan ' +
        'føre til at dager blir tapt — brukeren får et varsel om dette før hun ' +
        'bekrefter endringen.',
    visningssteder: ['periode-detaljer-redigering'],
    meldinger: [<FormattedMessage key="RedigeringPanel.KanMisteDager" id="RedigeringPanel.KanMisteDager" />],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        ctx.søker === 'MOR' &&
        erIkkeAdopsjon(ctx.familiesituasjon) &&
        !ctx.harPeriodeMedPleiepenger &&
        kanMisteDagerVedEndringTilFerie([...ctx.sammenslåtteValgtePerioder], ctx.familiehendelsedato),
});

export const ADOPSJON_PERIODE_FØR_FAMHEND = lagAlertregel<PeriodeDetaljerKontekst>({
    id: 'informasjonsAlerts.adopsjonPeriodeFørFamiliehendelsesdato',
    beskrivelse:
        'Adopsjon: brukeren har valgt perioder som ligger før familiehendelsesdatoen. ' +
        'Vises i detaljvisning av eksisterende valgte perioder for å forklare hvorfor ' +
        'de ikke er redigerbare.',
    visningssteder: ['periode-detaljer-redigering'],
    meldinger: [
        <FormattedMessage
            key="RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato"
            id="RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato"
        />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.familiesituasjon === 'adopsjon' && ctx.harPeriodeFørFamiliehendelsedato,
});

export const IKKE_REDIGERBAR_EØS = lagAlertregel<PeriodeDetaljerKontekst>({
    id: 'informasjonsAlerts.ikkeRedigerbarEøsUttak',
    beskrivelse:
        'EØS-uttaksperioder kan ikke redigeres i denne flyten. Alerten forklarer ' +
        'hvorfor periodene som er valgt, er låst.',
    visningssteder: ['periode-detaljer-redigering'],
    meldinger: [
        <FormattedMessage
            key="RedigeringPanel.IkkeRedigerbarEøsUttakPeriode"
            id="RedigeringPanel.IkkeRedigerbarEøsUttakPeriode"
        />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.eksisterendePerioderSomErValgt.some((p) => erEøsUttakPeriode(p)),
});

export const IKKE_REDIGERBAR_PLEIEPENGER = lagAlertregel<PeriodeDetaljerKontekst>({
    id: 'informasjonsAlerts.ikkeRedigerbarPleiepenger',
    beskrivelse:
        'Perioder med pleiepenger kan ikke redigeres i uttaksplanen. Alerten forklarer ' +
        'at disse blir stående som de er.',
    visningssteder: ['periode-detaljer-redigering'],
    meldinger: [
        <FormattedMessage
            key="RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger"
            id="RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger"
        />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.harPeriodeMedPleiepenger,
});

export const SENERE_PERIODER_READONLY = lagAlertregel<ForskyvEllerErstattKontekst>({
    id: 'informasjonsAlerts.senerePerioderReadonly',
    beskrivelse:
        'Brukeren legger inn eller endrer en periode, og det finnes senere perioder i ' +
        'planen som ikke kan endres. Da er «Endre uten å flytte resten av planen» det ' +
        'eneste mulige valget, og spørsmålet «Hva skal skje med resten av planen?» vises ikke.',
    visningssteder: ['forskyv-eller-erstatt'],
    meldinger: [
        <FormattedMessage key="RedigeringPanel.SenerePerioderReadonly" id="RedigeringPanel.SenerePerioderReadonly" />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.harSenerePerioderSomErReadonly,
});

export const VALGTE_DAGER_FØR_SEKS_UKER = lagAlertregel<ForskyvEllerErstattKontekst>({
    id: 'informasjonsAlerts.valgteDagerFørSeksUkerEtterFamDato',
    beskrivelse:
        'Brukeren har valgt dager som ligger innenfor seks uker etter familiehendelses' +
        'datoen (gjelder ikke adopsjon). Da kan ikke resten av planen flyttes, så ' +
        'spørsmålet «Hva skal skje med resten av planen?» vises ikke – endringen ' +
        'utføres direkte uten å flytte resten av planen.',
    visningssteder: ['forskyv-eller-erstatt'],
    meldinger: [
        <FormattedMessage
            key="RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato"
            id="RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato"
        />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => erIkkeAdopsjon(ctx.familiesituasjon) && ctx.harPeriodeFørSeksUkerEtterFamiliehendelsedato,
});

export const VALGTE_DAGER_FØR_FAMHEND = lagAlertregel<ForskyvEllerErstattKontekst>({
    id: 'informasjonsAlerts.valgteDagerFørFamiliehendelsesdato',
    beskrivelse:
        'Brukeren har valgt dager før familiehendelsesdatoen, men ikke innenfor seks ' +
        'uker etter (gjelder ikke adopsjon). Da kan ikke resten av planen flyttes, så ' +
        'spørsmålet «Hva skal skje med resten av planen?» vises ikke – endringen ' +
        'utføres direkte uten å flytte resten av planen.',
    visningssteder: ['forskyv-eller-erstatt'],
    meldinger: [
        <FormattedMessage
            key="RedigeringPanel.ValgtDagerFørFamiliehendelsesdato"
            id="RedigeringPanel.ValgtDagerFørFamiliehendelsesdato"
        />,
    ],
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        erIkkeAdopsjon(ctx.familiesituasjon) &&
        !ctx.harPeriodeFørSeksUkerEtterFamiliehendelsedato &&
        ctx.harPeriodeFørFamiliehendelsedato,
});

export const MANGLER_GRADERINGSAKTIVITET_LISTE = lagAlertregel<GraderingsaktivitetListeKontekst>({
    id: 'informasjonsAlerts.manglerGraderingsaktivitetListe',
    beskrivelse:
        'Brukeren har én eller flere graderte uttaksperioder der arbeidsgiver ikke er valgt. ' +
        'Dette kan skje når uttaksplanen er importert fra planleggar-appen uten arbeidsforhold-' +
        'informasjon. Vises som en samlet melding over hele listen, og brukeren må fylle inn ' +
        'arbeidsgiver på de markerte periodene før planen kan sendes inn.',
    visningssteder: ['uttaksplan-liste'],
    meldinger: [
        <FormattedMessage
            key="UttaksplanListe.ManglerGraderingsaktivitet"
            id="UttaksplanListe.ManglerGraderingsaktivitet"
        />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeMedUkjentGraderingsaktivitet([...ctx.perioder], ctx.søker),
});

export const MANGLER_GRADERINGSAKTIVITET_KALENDER = lagAlertregel<GraderingsaktivitetListeKontekst>({
    id: 'informasjonsAlerts.manglerGraderingsaktivitetKalender',
    beskrivelse:
        'Samme tilfelle som listevarianten — graderte perioder uten valgt arbeidsgiver — men ' +
        'vises samlet over kalendervisningen. Periodene får i tillegg et ikon i kalenderen for ' +
        'å synliggjøre hvilke dager som mangler informasjon.',
    visningssteder: ['uttaksplan-kalender'],
    meldinger: [
        <FormattedMessage
            key="UttaksplanKalender.MarkertePerioderGradering"
            id="UttaksplanKalender.MarkertePerioderGradering"
        />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeMedUkjentGraderingsaktivitet([...ctx.perioder], ctx.søker),
});

export const GRADERINGSAKTIVITET_IKKE_VALGT_EKSISTERENDE = lagAlertregel<GraderingsaktivitetPeriodeKontekst>({
    id: 'informasjonsAlerts.graderingsaktivitetIkkeValgtEksisterende',
    beskrivelse:
        'Vises ved hver valgte eksisterende periode i kalender-redigering når perioden er ' +
        'gradert men mangler valg av arbeidsgiver. Synliggjør hvilke konkrete perioder som ' +
        'krever utfylling før planen kan sendes inn.',
    visningssteder: ['eksisterende-valgte-perioder'],
    meldinger: [
        <FormattedMessage
            key="RedigeringPanel.GraderingsaktivitetIkkeValgt"
            id="RedigeringPanel.GraderingsaktivitetIkkeValgt"
        />,
    ],
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeMedUkjentGraderingsaktivitet([ctx.periode], ctx.søker),
});

/**
 * Komplett liste over informasjons-alertreglar. Storybook-katalogen
 * og andre konsumentar importerer denne lista i staden for å vedlikehalde
 * sin eigen kopi, slik at nye reglar automatisk dukkar opp i dokumentasjonen.
 */
export const INFORMASJONS_ALERTS: readonly AlertregelDoc[] = [
    MANGLER_MORS_AKTIVITET_LISTE,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE,
    MANGLER_GRADERINGSAKTIVITET_LISTE,
    MANGLER_GRADERINGSAKTIVITET_KALENDER,
    GRADERINGSAKTIVITET_IKKE_VALGT_EKSISTERENDE,
    KAN_MISTE_DAGER,
    ADOPSJON_PERIODE_FØR_FAMHEND,
    IKKE_REDIGERBAR_EØS,
    IKKE_REDIGERBAR_PLEIEPENGER,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGER_FØR_SEKS_UKER,
    VALGTE_DAGER_FØR_FAMHEND,
];
