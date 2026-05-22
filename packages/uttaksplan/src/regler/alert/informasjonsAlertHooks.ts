import dayjs from 'dayjs';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode, UttaksplanperiodeMedKunTapteDager, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { erDetReadonlyPerioderEtterValgtePerioder } from '../../utils/periodeUtils';
import { Periode } from '../types';
import {
    ADOPSJON_PERIODE_FØR_FAMHEND,
    ForskyvEllerErstattKontekst,
    IKKE_REDIGERBAR_EØS,
    IKKE_REDIGERBAR_PLEIEPENGER,
    KAN_MISTE_DAGER,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MANGLER_MORS_AKTIVITET_LISTE,
    MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING,
    PeriodeDetaljerKontekst,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGER_FØR_FAMHEND,
    VALGTE_DAGER_FØR_SEKS_UKER,
} from './informasjonsAlerts';
import { Alertregel } from './types';

/**
 * Aktiv alert = en regel som har slått inn, ferdig pakket for visning
 * (meldingsnøkkel + variant). Brukes som returtype fra alle hookene
 * under for å gi konsumentene en uniform shape.
 */
export type AktivAlert = { meldingId: string; variant: 'info' | 'warning' };

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
    morsAktivitetIkkeOppgitt?: AktivAlert;
};

/** Informasjons-alerter i legg-til/endre-periode-skjemaet. */
export const useLeggTilEndreSkjemaInfoAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): LeggTilEndreSkjemaInfoAlerts => {
    const {
        foreldreInfo: { rettighetType },
    } = useUttaksplanData();
    return {
        morsAktivitetIkkeOppgitt: tilAktiv(MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING, { rettighetType, perioder }),
    };
};

export type PeriodeDetaljerAlerts = {
    adopsjonFørFamhend?: AktivAlert;
    eøs?: AktivAlert;
    pleiepenger?: AktivAlert;
    kanMisteDager?: AktivAlert;
};

/** Alle informasjons-alerter i detaljvisning av valgte eksisterende perioder. */
export const usePeriodeDetaljerAlerts = (input: {
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
}): PeriodeDetaljerAlerts => {
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

    const ctx: PeriodeDetaljerKontekst = {
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
        eøs: tilAktiv(IKKE_REDIGERBAR_EØS, ctx),
        pleiepenger: tilAktiv(IKKE_REDIGERBAR_PLEIEPENGER, ctx),
        kanMisteDager: tilAktiv(KAN_MISTE_DAGER, ctx),
    };
};

export type ForskyvEllerErstattAlerts = {
    senerePerioderReadonly?: AktivAlert;
    valgteDagerFørSeksUker?: AktivAlert;
    valgteDagerFørFamhend?: AktivAlert;
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
        valgteDagerFørSeksUker: tilAktiv(VALGTE_DAGER_FØR_SEKS_UKER, ctx),
        valgteDagerFørFamhend: tilAktiv(VALGTE_DAGER_FØR_FAMHEND, ctx),
    };
};
