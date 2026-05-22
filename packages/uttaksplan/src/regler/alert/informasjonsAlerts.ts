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
        'Brukeren har én eller flere perioder som krever mors aktivitet, men ' +
        'aktiviteten er ikke valgt. Vises som en samlet melding over hele listen.',
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
        'Brukeren har én eller flere perioder som krever mors aktivitet, men ' +
        'aktiviteten er ikke valgt. Vises samlet over hele kalenderen, sammen med ' +
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
        'Vises i redigeringspanelene når brukeren har valgt perioder som krever mors ' +
        'aktivitet, men aktiviteten ikke er fylt ut. Vises både i kalender- og ' +
        'listeredigering for å minne om manglende valg før innsending.',
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
        'Vises ved hver valgte eksisterende periode i kalender-redigering når perioden ' +
        'krever mors aktivitet, men aktiviteten ikke er valgt. Synliggjør hvilke konkrete ' +
        'perioder som mangler valg.',
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
        'Mor har valgt å endre én eller flere perioder til ferie. Slik endring kan ' +
        'føre til at dager blir tapt — brukeren får et varsel om dette før hun ' +
        'bekrefter endringen.',
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
        'Adopsjon: brukeren har valgt perioder som ligger før familiehendelsesdatoen. ' +
        'Vises i detaljvisning av eksisterende valgte perioder for å forklare hvorfor ' +
        'de ikke er redigerbare.',
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
        'EØS-uttaksperioder kan ikke redigeres i denne flyten. Alerten forklarer ' +
        'hvorfor periodene som er valgt, er låst.',
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
        'Perioder med pleiepenger kan ikke redigeres i uttaksplanen. Alerten forklarer ' +
        'at disse blir stående som de er.',
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
        'Brukeren har valgt forskyv eller erstatt, og det finnes senere perioder i ' +
        'planen som ikke kan endres. Alerten forklarer at disse blir stående.',
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
        'Brukeren har valgt dager som ligger innenfor seks uker etter familiehendelses' +
        'datoen (gjelder ikke adopsjon). Alerten forklarer konsekvenser for ' +
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
        'Brukeren har valgt dager før familiehendelsesdatoen, men ikke innenfor seks ' +
        'uker etter (gjelder ikke adopsjon). Alerten forklarer konsekvenser for ' +
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
    område: 'Informasjonsmeldinger i uttaksplanen',
    beskrivelse:
        'Disse meldingene dukker opp ulike steder i uttaksplan-visningen (liste, kalender, ' +
        'redigeringspaneler) for å informere brukeren om konsekvenser av valg, manglende ' +
        'utfyllinger eller låste perioder. De stopper ikke brukeren — men gir kontekst ' +
        'eller varsler om noe som krever oppmerksomhet.',
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

export type UttaksplanListeAlerts = {
    manglerMorsAktivitet?: AktivAlert;
};

/** Alerter som vises over hele listevisningen. */
export const useUttaksplanListeAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): UttaksplanListeAlerts => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return {
        manglerMorsAktivitet: tilAktiv(MANGLER_MORS_AKTIVITET_LISTE, { rettighetType, perioder }),
    };
};

export type UttaksplanKalenderAlerts = {
    manglerMorsAktivitet?: AktivAlert;
};

/** Alerter som vises over hele kalendervisningen. */
export const useUttaksplanKalenderAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): UttaksplanKalenderAlerts => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return {
        manglerMorsAktivitet: tilAktiv(MANGLER_MORS_AKTIVITET_KALENDER, { rettighetType, perioder }),
    };
};

export type LeggTilEndreSkjemaInfoAlerts = {
    morsAktivitetIkkjeOppgitt?: AktivAlert;
};

/** Informasjons-alerter i legg-til/endre-periode-skjemaet. */
export const useLeggTilEndreSkjemaInfoAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): LeggTilEndreSkjemaInfoAlerts => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return {
        morsAktivitetIkkjeOppgitt: tilAktiv(MORS_AKTIVITET_IKKJE_OPPGITT_REDIGERING, { rettighetType, perioder }),
    };
};

export type PeriodeDetaljarAlerts = {
    adopsjonFørFamhend?: AktivAlert;
    eøs?: AktivAlert;
    pleiepenger?: AktivAlert;
    kanMisteDagar?: AktivAlert;
};

/** Alle informasjons-alerter i detaljvisning av valgte eksisterende perioder. */
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

/** Alerter i forskyv- og erstatt-panelene. */
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
