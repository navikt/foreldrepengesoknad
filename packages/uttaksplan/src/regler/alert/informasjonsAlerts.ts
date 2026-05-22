import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    RettighetType_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { kanMisteDagerVedEndringTilFerie } from '../../felles/uttaksplanValidatorer';
import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { erDetReadonlyPerioderEtterValgtePerioder, harPeriodeDerMorsAktivitetIkkeErValgt } from '../../utils/periodeUtils';
import { Periode, i18n } from '../types';
import { Alertregel, Alertområde } from './types';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

/* ----------------- Kontekst-typar ----------------- */

type MorsAktivitetListeKontekst = {
    rettighetType: RettighetType_fpoversikt;
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
};

type EksisterendeValgtePeriodeKontekst = {
    rettighetType: RettighetType_fpoversikt;
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager;
    morsUttakPerioder: readonly UttakPeriode_fpoversikt[];
};

type PeriodeDetaljarKontekst = {
    søker: BrukerRolleSak_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
    harPeriodeMedPleiepenger: boolean;
    harPeriodeFørFamiliehendelsedato: boolean;
};

type ForskyvEllerErstattKontekst = {
    familiesituasjon: Familiesituasjon;
    harSenerePerioderSomErReadonly: boolean;
    harPeriodeFørSeksUkerEtterFamiliehendelsedato: boolean;
    harPeriodeFørFamiliehendelsedato: boolean;
};

/* ----------------- Felles helpers ----------------- */

const erIkkjeAdopsjon = (familiesituasjon: Familiesituasjon) => familiesituasjon !== 'adopsjon';

/* ----------------- Reglar ----------------- */

const MANGLER_MORS_AKTIVITET_LISTE: Alertregel<MorsAktivitetListeKontekst> = {
    id: 'mangler-mors-aktivitet-liste',
    beskrivelse:
        'Brukaren har éin eller fleire periodar som krev mors aktivitet, men ' +
        'aktiviteten er ikkje vald. Vises som ein samla melding over heile lista.',
    visningsstader: ['uttaksplan-liste'],
    meldingIder: [i18n('UttaksplanListe.ManglerMorsAktivitet')],
    getMeldingId: () => i18n('UttaksplanListe.ManglerMorsAktivitet'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [...ctx.perioder]),
};

const MANGLER_MORS_AKTIVITET_KALENDER: Alertregel<MorsAktivitetListeKontekst> = {
    id: 'mangler-mors-aktivitet-kalender',
    beskrivelse:
        'Brukaren har éin eller fleire periodar som krev mors aktivitet, men ' +
        'aktiviteten er ikkje vald. Vises samla over heile kalenderen, saman med ' +
        'lenke til informasjon om aktivitetskravet.',
    visningsstader: ['uttaksplan-kalender'],
    meldingIder: [i18n('UttaksplanKalender.MarkertePerioder')],
    getMeldingId: () => i18n('UttaksplanKalender.MarkertePerioder'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [...ctx.perioder]),
};

const MORS_AKTIVITET_IKKJE_OPPGITT_REDIGERING: Alertregel<MorsAktivitetListeKontekst> = {
    id: 'mors-aktivitet-ikkje-oppgitt-redigering',
    beskrivelse:
        'Vises i redigeringspanela når brukaren har valt periodar som krev mors ' +
        'aktivitet, men aktiviteten ikkje er fylt ut. Vises både i kalender- og ' +
        'listeredigering for å minne om manglande val før innsending.',
    visningsstader: ['legg-til-endre-skjema'],
    meldingIder: [i18n('LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt')],
    getMeldingId: () => i18n('LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) => harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [...ctx.perioder]),
};

const MORS_AKTIVITET_IKKJE_VALGT_EKSISTERANDE: Alertregel<EksisterendeValgtePeriodeKontekst> = {
    id: 'mors-aktivitet-ikkje-valgt-eksisterande',
    beskrivelse:
        'Vises ved kvar valgt eksisterande periode i kalender-redigering når perioden ' +
        'krev mors aktivitet, men aktiviteten ikkje er vald. Synleggjer kva konkrete ' +
        'periodar som manglar val.',
    visningsstader: ['eksisterande-valgte-perioder'],
    meldingIder: [i18n('RedigeringPanel.MorsAktivitetIkkeValgt')],
    getMeldingId: () => i18n('RedigeringPanel.MorsAktivitetIkkeValgt'),
    variant: 'warning',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        harPeriodeDerMorsAktivitetIkkeErValgt(ctx.rettighetType, [ctx.periode, ...ctx.morsUttakPerioder]),
};

const KAN_MISTE_DAGAR: Alertregel<PeriodeDetaljarKontekst> = {
    id: 'kan-miste-dager',
    beskrivelse:
        'Mor har valt å endre éin eller fleire periodar til ferie. Slik endring kan ' +
        'føre til at dagar blir tapt — brukaren får ein åtvaring om dette før ho ' +
        'stadfestar endringa.',
    visningsstader: ['periode-detaljar-redigering'],
    meldingIder: [i18n('RedigeringPanel.KanMisteDager')],
    getMeldingId: () => i18n('RedigeringPanel.KanMisteDager'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        ctx.søker === 'MOR' &&
        erIkkjeAdopsjon(ctx.familiesituasjon) &&
        !ctx.harPeriodeMedPleiepenger &&
        kanMisteDagerVedEndringTilFerie([...ctx.sammenslåtteValgtePerioder], ctx.familiehendelsedato),
};

const ADOPSJON_PERIODE_FØR_FAMHEND: Alertregel<PeriodeDetaljarKontekst> = {
    id: 'adopsjon-periode-før-familiehendelsesdato',
    beskrivelse:
        'Adopsjon: brukaren har valt periodar som ligg før familiehendelsesdatoen. ' +
        'Vises i detaljvisning av eksisterande valgte periodar for å forklare kvifor ' +
        'dei ikkje er redigerbare.',
    visningsstader: ['periode-detaljar-redigering'],
    meldingIder: [i18n('RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato')],
    getMeldingId: () => i18n('RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.familiesituasjon === 'adopsjon' && ctx.harPeriodeFørFamiliehendelsedato,
};

const IKKJE_REDIGERBAR_EØS: Alertregel<PeriodeDetaljarKontekst> = {
    id: 'ikkje-redigerbar-eøs-uttak',
    beskrivelse:
        'EØS-uttaksperiodar kan ikkje redigerast i denne flyten. Alerten forklarar ' +
        'kvifor periodane som er valt, er låst.',
    visningsstader: ['periode-detaljar-redigering'],
    meldingIder: [i18n('RedigeringPanel.IkkeRedigerbarEøsUttakPeriode')],
    getMeldingId: () => i18n('RedigeringPanel.IkkeRedigerbarEøsUttakPeriode'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.eksisterendePerioderSomErValgt.some((p) => erEøsUttakPeriode(p)),
};

const IKKJE_REDIGERBAR_PLEIEPENGER: Alertregel<PeriodeDetaljarKontekst> = {
    id: 'ikkje-redigerbar-pleiepenger',
    beskrivelse:
        'Periodar med pleiepengar kan ikkje redigerast i uttaksplanen. Alerten forklarar ' +
        'at desse blir ståande som dei er.',
    visningsstader: ['periode-detaljar-redigering'],
    meldingIder: [i18n('RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger')],
    getMeldingId: () => i18n('RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.harPeriodeMedPleiepenger,
};

const SENERE_PERIODER_READONLY: Alertregel<ForskyvEllerErstattKontekst> = {
    id: 'senere-perioder-readonly',
    beskrivelse:
        'Brukaren har valt forskyv eller erstatt, og det finst seinare periodar i ' +
        'planen som ikkje kan endrast. Alerten forklarar at desse blir ståande.',
    visningsstader: ['forskyv-eller-erstatt'],
    meldingIder: [i18n('RedigeringPanel.SenerePerioderReadonly')],
    getMeldingId: () => i18n('RedigeringPanel.SenerePerioderReadonly'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => ctx.harSenerePerioderSomErReadonly,
};

const VALGTE_DAGAR_FØR_SEKS_UKER: Alertregel<ForskyvEllerErstattKontekst> = {
    id: 'valgte-dager-før-seks-uker-etter-fam-dato',
    beskrivelse:
        'Brukaren har valt dagar som ligg innanfor seks veker etter familiehendelses' +
        'datoen (gjeld ikkje adopsjon). Alerten forklarar konsekvensar for ' +
        'forskyv/erstatt-operasjonen.',
    visningsstader: ['forskyv-eller-erstatt'],
    meldingIder: [i18n('RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato')],
    getMeldingId: () => i18n('RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) => erIkkjeAdopsjon(ctx.familiesituasjon) && ctx.harPeriodeFørSeksUkerEtterFamiliehendelsedato,
};

const VALGTE_DAGAR_FØR_FAMHEND: Alertregel<ForskyvEllerErstattKontekst> = {
    id: 'valgte-dager-før-familiehendelsesdato',
    beskrivelse:
        'Brukaren har valt dagar før familiehendelsesdatoen, men ikkje innanfor seks ' +
        'veker etter (gjeld ikkje adopsjon). Alerten forklarar konsekvensar for ' +
        'forskyv/erstatt.',
    visningsstader: ['forskyv-eller-erstatt'],
    meldingIder: [i18n('RedigeringPanel.ValgtDagerFørFamiliehendelsesdato')],
    getMeldingId: () => i18n('RedigeringPanel.ValgtDagerFørFamiliehendelsesdato'),
    variant: 'info',
    type: 'kontekstuell',
    skalVises: (ctx) =>
        erIkkjeAdopsjon(ctx.familiesituasjon) &&
        !ctx.harPeriodeFørSeksUkerEtterFamiliehendelsedato &&
        ctx.harPeriodeFørFamiliehendelsedato,
};

const ALLE_INFORMASJONS_ALERTS: ReadonlyArray<Alertregel<unknown>> = [
    MANGLER_MORS_AKTIVITET_LISTE,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MORS_AKTIVITET_IKKJE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKJE_VALGT_EKSISTERANDE,
    KAN_MISTE_DAGAR,
    ADOPSJON_PERIODE_FØR_FAMHEND,
    IKKJE_REDIGERBAR_EØS,
    IKKJE_REDIGERBAR_PLEIEPENGER,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGAR_FØR_SEKS_UKER,
    VALGTE_DAGAR_FØR_FAMHEND,
] as ReadonlyArray<Alertregel<unknown>>;

/** Eksporterte rule-konstantar for komponentar som allereie har trigger-tilstanden lokalt. */
export {
    MORS_AKTIVITET_IKKJE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKJE_VALGT_EKSISTERANDE,
    KAN_MISTE_DAGAR,
};

export const INFORMASJONS_ALERT_OMRÅDE: Alertområde = {
    id: 'informasjons-alerts',
    område: 'Informasjonsmeldingar i uttaksplanen',
    beskrivelse:
        'Desse meldingane dukkar opp ulike stader i uttaksplan-visninga (liste, kalender, ' +
        'redigeringspaneler) for å informere brukaren om konsekvensar av val, manglande ' +
        'utfyllingar eller låste periodar. Dei stoppar ikkje brukaren — men gir kontekst ' +
        'eller varslar om noko som krev oppmerksemd.',
    regler: ALLE_INFORMASJONS_ALERTS.map(({ id, beskrivelse, visningsstader, meldingIder, variant, type }) => ({
        id,
        beskrivelse,
        visningsstader,
        meldingIder,
        variant,
        type,
    })),
};

/* ----------------- Hooks og helpers for komponentane ----------------- */

type AktivAlert = { meldingId: string; variant: 'info' | 'warning' };

const tilAktiv = <T,>(regel: Alertregel<T>, ctx: T): AktivAlert | undefined =>
    regel.skalVises(ctx) ? { meldingId: regel.getMeldingId(ctx), variant: regel.variant } : undefined;

/** Alert over heile listevisninga når mors aktivitet manglar på éin eller fleire periodar. */
export const useManglerMorsAktivitetListeAlert = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): AktivAlert | undefined => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return tilAktiv(MANGLER_MORS_AKTIVITET_LISTE, { rettighetType, perioder });
};

/** Alert over heile kalendervisninga når mors aktivitet manglar. */
export const useManglerMorsAktivitetKalenderAlert = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): AktivAlert | undefined => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return tilAktiv(MANGLER_MORS_AKTIVITET_KALENDER, { rettighetType, perioder });
};

/** Alert i skjema-redigering når mors aktivitet ikkje er oppgitt. */
export const useMorsAktivitetIkkjeOppgittRedigeringAlert = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): AktivAlert | undefined => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return tilAktiv(MORS_AKTIVITET_IKKJE_OPPGITT_REDIGERING, { rettighetType, perioder });
};

/** Per-periode alert i kalender-redigering når mors aktivitet ikkje er vald. */
export const useMorsAktivitetIkkjeValgtEksisterandeAlert = (
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager,
    morsUttakPerioder: readonly UttakPeriode_fpoversikt[],
): AktivAlert | undefined => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return tilAktiv(MORS_AKTIVITET_IKKJE_VALGT_EKSISTERANDE, { rettighetType, periode, morsUttakPerioder });
};

export type PeriodeDetaljarAlerts = {
    adopsjonFørFamhend?: AktivAlert;
    eøs?: AktivAlert;
    pleiepenger?: AktivAlert;
    kanMisteDagar?: AktivAlert;
};

/** Alle informasjons-alertar i detaljvisning av valgte eksisterande periodar. */
export const usePeriodeDetaljarAlerts = (input: {
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
}): PeriodeDetaljarAlerts => {
    const {
        familiesituasjon,
        familiehendelsedato,
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const harPeriodeFørFamiliehendelsedato = input.sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );
    const harPeriodeMedPleiepenger = input.eksisterendePerioderSomErValgt.some(
        (p) =>
            erVanligUttakPeriode(p) &&
            p.resultat?.innvilget === false &&
            p.resultat.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER',
    );

    const ctx: PeriodeDetaljarKontekst = {
        søker,
        familiesituasjon,
        familiehendelsedato,
        sammenslåtteValgtePerioder: input.sammenslåtteValgtePerioder,
        eksisterendePerioderSomErValgt: input.eksisterendePerioderSomErValgt,
        harPeriodeMedPleiepenger,
        harPeriodeFørFamiliehendelsedato,
    };

    return {
        adopsjonFørFamhend: tilAktiv(ADOPSJON_PERIODE_FØR_FAMHEND, ctx),
        eøs: tilAktiv(IKKJE_REDIGERBAR_EØS, ctx),
        pleiepenger: tilAktiv(IKKJE_REDIGERBAR_PLEIEPENGER, ctx),
        kanMisteDagar: tilAktiv(KAN_MISTE_DAGAR, ctx),
    };
};

export type ForskyvEllerErstattAlerts = {
    senerePerioderReadonly?: AktivAlert;
    valgteDagarFørSeksUker?: AktivAlert;
    valgteDagarFørFamhend?: AktivAlert;
};

/** Alertar i forskyv- og erstatt-panela. */
export const useForskyvEllerErstattAlerts = (input: {
    valgtePerioder: readonly Periode[];
    erFerie?: boolean;
    erGradert?: boolean;
}): ForskyvEllerErstattAlerts => {
    const {
        familiesituasjon,
        familiehendelsedato,
        uttakPerioder,
        erPeriodeneTilAnnenPartLåst,
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const harPeriodeFørFamiliehendelsedato = input.valgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );
    const harPeriodeFørSeksUkerEtterFamiliehendelsedato =
        input.erFerie || input.erGradert
            ? UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
                  [...input.valgtePerioder],
                  familiehendelsedato,
              )
            : false;

    const forelderSomHarLåstePerioder = erPeriodeneTilAnnenPartLåst
        ? søker === 'MOR'
            ? 'FAR_MEDMOR'
            : 'MOR'
        : undefined;
    const harSenerePerioderSomErReadonly = erDetReadonlyPerioderEtterValgtePerioder(
        uttakPerioder,
        [...input.valgtePerioder],
        forelderSomHarLåstePerioder,
    );

    const ctx: ForskyvEllerErstattKontekst = {
        familiesituasjon,
        harSenerePerioderSomErReadonly,
        harPeriodeFørSeksUkerEtterFamiliehendelsedato,
        harPeriodeFørFamiliehendelsedato,
    };

    return {
        senerePerioderReadonly: tilAktiv(SENERE_PERIODER_READONLY, ctx),
        valgteDagarFørSeksUker: tilAktiv(VALGTE_DAGAR_FØR_SEKS_UKER, ctx),
        valgteDagarFørFamhend: tilAktiv(VALGTE_DAGAR_FØR_FAMHEND, ctx),
    };
};
