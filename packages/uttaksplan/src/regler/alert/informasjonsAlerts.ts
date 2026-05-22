import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    RettighetType_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { kanMisteDagerVedEndringTilFerie } from '../../felles/uttaksplanValidatorer';
import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { harPeriodeDerMorsAktivitetIkkeErValgt } from '../../utils/periodeUtils';
import { Periode, i18n } from '../types';
import { Alertregel, Alertområde } from './types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

/* ----------------- Kontekst-typer ----------------- */

export type MorsAktivitetListeKontekst = {
    rettighetType: RettighetType_fpoversikt;
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
};

type EksisterendeValgtePeriodeKontekst = {
    rettighetType: RettighetType_fpoversikt;
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager;
    morsUttakPerioder: readonly UttakPeriode_fpoversikt[];
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

export const MANGLER_MORS_AKTIVITET_LISTE: Alertregel<MorsAktivitetListeKontekst> = {
    id: 'informasjonsAlerts.manglerMorsAktivitetListe',
    beskrivelse:
        'Brukeren har én eller flere perioder som krever mors aktivitet, men ' +
        'aktiviteten er ikke valgt. Vises som en samlet melding over hele listen.',
    visningssteder: ['uttaksplan-liste'],
    meldingIder: [i18n('UttaksplanListe.ManglerMorsAktivitet')],
    getMeldingId: () => i18n('UttaksplanListe.ManglerMorsAktivitet'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [...ctx.perioder]),
};

export const MANGLER_MORS_AKTIVITET_KALENDER: Alertregel<MorsAktivitetListeKontekst> = {
    id: 'informasjonsAlerts.manglerMorsAktivitetKalender',
    beskrivelse:
        'Brukeren har én eller flere perioder som krever mors aktivitet, men ' +
        'aktiviteten er ikke valgt. Vises samlet over hele kalenderen, sammen med ' +
        'lenke til informasjon om aktivitetskravet.',
    visningssteder: ['uttaksplan-kalender'],
    meldingIder: [i18n('UttaksplanKalender.MarkertePerioder')],
    getMeldingId: () => i18n('UttaksplanKalender.MarkertePerioder'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [...ctx.perioder]),
};

export const MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING: Alertregel<MorsAktivitetListeKontekst> = {
    id: 'informasjonsAlerts.morsAktivitetIkkeOppgittRedigering',
    beskrivelse:
        'Vises i redigeringspanelene når brukeren har valgt perioder som krever mors ' +
        'aktivitet, men aktiviteten ikke er fylt ut. Vises både i kalender- og ' +
        'listeredigering for å minne om manglende valg før innsending.',
    visningssteder: ['legg-til-endre-skjema'],
    meldingIder: [i18n('LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt')],
    getMeldingId: () => i18n('LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [...ctx.perioder]),
};

export const MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE: Alertregel<EksisterendeValgtePeriodeKontekst> = {
    id: 'informasjonsAlerts.morsAktivitetIkkeValgtEksisterende',
    beskrivelse:
        'Vises ved hver valgte eksisterende periode i kalender-redigering når perioden ' +
        'krever mors aktivitet, men aktiviteten ikke er valgt. Synliggjør hvilke konkrete ' +
        'perioder som mangler valg.',
    visningssteder: ['eksisterende-valgte-perioder'],
    meldingIder: [i18n('RedigeringPanel.MorsAktivitetIkkeValgt')],
    getMeldingId: () => i18n('RedigeringPanel.MorsAktivitetIkkeValgt'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [ctx.periode, ...ctx.morsUttakPerioder]),
};

export const KAN_MISTE_DAGER: Alertregel<PeriodeDetaljerKontekst> = {
    id: 'informasjonsAlerts.kanMisteDager',
    beskrivelse:
        'Mor har valgt å endre én eller flere perioder til ferie. Slik endring kan ' +
        'føre til at dager blir tapt — brukeren får et varsel om dette før hun ' +
        'bekrefter endringen.',
    visningssteder: ['periode-detaljer-redigering'],
    meldingIder: [i18n('RedigeringPanel.KanMisteDager')],
    getMeldingId: () => i18n('RedigeringPanel.KanMisteDager'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        ctx.søker === 'MOR' &&
        erIkkeAdopsjon(ctx.familiesituasjon) &&
        !ctx.harPeriodeMedPleiepenger &&
        kanMisteDagerVedEndringTilFerie([...ctx.sammenslåtteValgtePerioder], ctx.familiehendelsedato),
};

export const ADOPSJON_PERIODE_FØR_FAMHEND: Alertregel<PeriodeDetaljerKontekst> = {
    id: 'informasjonsAlerts.adopsjonPeriodeFørFamiliehendelsesdato',
    beskrivelse:
        'Adopsjon: brukeren har valgt perioder som ligger før familiehendelsesdatoen. ' +
        'Vises i detaljvisning av eksisterende valgte perioder for å forklare hvorfor ' +
        'de ikke er redigerbare.',
    visningssteder: ['periode-detaljer-redigering'],
    meldingIder: [i18n('RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato')],
    getMeldingId: () => i18n('RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.familiesituasjon === 'adopsjon' && ctx.harPeriodeFørFamiliehendelsedato,
};

export const IKKE_REDIGERBAR_EØS: Alertregel<PeriodeDetaljerKontekst> = {
    id: 'informasjonsAlerts.ikkeRedigerbarEøsUttak',
    beskrivelse:
        'EØS-uttaksperioder kan ikke redigeres i denne flyten. Alerten forklarer ' +
        'hvorfor periodene som er valgt, er låst.',
    visningssteder: ['periode-detaljer-redigering'],
    meldingIder: [i18n('RedigeringPanel.IkkeRedigerbarEøsUttakPeriode')],
    getMeldingId: () => i18n('RedigeringPanel.IkkeRedigerbarEøsUttakPeriode'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.eksisterendePerioderSomErValgt.some((p) => erEøsUttakPeriode(p)),
};

export const IKKE_REDIGERBAR_PLEIEPENGER: Alertregel<PeriodeDetaljerKontekst> = {
    id: 'informasjonsAlerts.ikkeRedigerbarPleiepenger',
    beskrivelse:
        'Perioder med pleiepenger kan ikke redigeres i uttaksplanen. Alerten forklarer ' +
        'at disse blir stående som de er.',
    visningssteder: ['periode-detaljer-redigering'],
    meldingIder: [i18n('RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger')],
    getMeldingId: () => i18n('RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.harPeriodeMedPleiepenger,
};

export const SENERE_PERIODER_READONLY: Alertregel<ForskyvEllerErstattKontekst> = {
    id: 'informasjonsAlerts.senerePerioderReadonly',
    beskrivelse:
        'Brukeren har valgt forskyv eller erstatt, og det finnes senere perioder i ' +
        'planen som ikke kan endres. Alerten forklarer at disse blir stående.',
    visningssteder: ['forskyv-eller-erstatt'],
    meldingIder: [i18n('RedigeringPanel.SenerePerioderReadonly')],
    getMeldingId: () => i18n('RedigeringPanel.SenerePerioderReadonly'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.harSenerePerioderSomErReadonly,
};

export const VALGTE_DAGER_FØR_SEKS_UKER: Alertregel<ForskyvEllerErstattKontekst> = {
    id: 'informasjonsAlerts.valgteDagerFørSeksUkerEtterFamDato',
    beskrivelse:
        'Brukeren har valgt dager som ligger innenfor seks uker etter familiehendelses' +
        'datoen (gjelder ikke adopsjon). Alerten forklarer konsekvenser for ' +
        'forskyv/erstatt-operasjonen.',
    visningssteder: ['forskyv-eller-erstatt'],
    meldingIder: [i18n('RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato')],
    getMeldingId: () => i18n('RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => erIkkeAdopsjon(ctx.familiesituasjon) && ctx.harPeriodeFørSeksUkerEtterFamiliehendelsedato,
};

export const VALGTE_DAGER_FØR_FAMHEND: Alertregel<ForskyvEllerErstattKontekst> = {
    id: 'informasjonsAlerts.valgteDagerFørFamiliehendelsesdato',
    beskrivelse:
        'Brukeren har valgt dager før familiehendelsesdatoen, men ikke innenfor seks ' +
        'uker etter (gjelder ikke adopsjon). Alerten forklarer konsekvenser for ' +
        'forskyv/erstatt.',
    visningssteder: ['forskyv-eller-erstatt'],
    meldingIder: [i18n('RedigeringPanel.ValgtDagerFørFamiliehendelsesdato')],
    getMeldingId: () => i18n('RedigeringPanel.ValgtDagerFørFamiliehendelsesdato'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        erIkkeAdopsjon(ctx.familiesituasjon) &&
        !ctx.harPeriodeFørSeksUkerEtterFamiliehendelsedato &&
        ctx.harPeriodeFørFamiliehendelsedato,
};

const ALLE_INFORMASJONS_ALERTS: ReadonlyArray<Alertregel<unknown>> = [
    MANGLER_MORS_AKTIVITET_LISTE,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE,
    KAN_MISTE_DAGER,
    ADOPSJON_PERIODE_FØR_FAMHEND,
    IKKE_REDIGERBAR_EØS,
    IKKE_REDIGERBAR_PLEIEPENGER,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGER_FØR_SEKS_UKER,
    VALGTE_DAGER_FØR_FAMHEND,
] as ReadonlyArray<Alertregel<unknown>>;

export const INFORMASJONS_ALERT_OMRÅDE: Alertområde = {
    id: 'informasjonsAlerts',
    område: 'Informasjonsmeldinger i uttaksplanen',
    beskrivelse:
        'Disse meldingene dukker opp ulike steder i uttaksplan-visningen (liste, kalender, ' +
        'redigeringspaneler) for å informere brukeren om konsekvenser av valg, manglende ' +
        'utfyllinger eller låste perioder. De stopper ikke brukeren — men gir kontekst ' +
        'eller varsler om noe som krever oppmerksomhet.',
    regler: ALLE_INFORMASJONS_ALERTS,
};
