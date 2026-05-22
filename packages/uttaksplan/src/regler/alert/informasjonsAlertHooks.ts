import dayjs from 'dayjs';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { kanMisteDagerVedEndringTilFerie } from '../../felles/uttaksplanValidatorer';
import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
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
    MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE,
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

/**
 * Listepanelet skal varsle om at mor kan miste dager når hun endrer en
 * periode til ferie/opphold, og når en eller flere eksisterende perioder
 * mangler valg av mors aktivitet. Mor-aktivitet-flagget regnes ut høyere
 * oppe (over hele uttaksplanen) og mates inn som input.
 */
export type ListePanelInfoAlerts = {
    kanMisteDagerVedFerie?: AktivAlert;
    morsAktivitetIkkeOppgitt?: AktivAlert;
};

export const useListePanelInfoAlerts = (input: {
    valgtPeriode: { fom: string; tom: string } | undefined;
    harValgtFerieEllerOpphold: boolean;
    harPeriodeDerMorsAktivitetIkkeErValgt: boolean;
}): ListePanelInfoAlerts => {
    const {
        foreldreInfo: { søker, rettighetType },
        familiesituasjon,
        familiehendelsedato,
    } = useUttaksplanData();

    const visKanMisteDager =
        !!input.valgtPeriode &&
        input.harValgtFerieEllerOpphold &&
        søker === 'MOR' &&
        familiesituasjon !== 'adopsjon' &&
        kanMisteDagerVedEndringTilFerie([input.valgtPeriode], familiehendelsedato);

    return {
        kanMisteDagerVedFerie: visKanMisteDager
            ? {
                  variant: KAN_MISTE_DAGER.variant,
                  meldingId: KAN_MISTE_DAGER.getMeldingId({} as never),
              }
            : undefined,
        morsAktivitetIkkeOppgitt: input.harPeriodeDerMorsAktivitetIkkeErValgt
            ? {
                  variant: MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING.variant,
                  meldingId: MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING.getMeldingId({ rettighetType, perioder: [] }),
              }
            : undefined,
    };
};

/**
 * For listen av eksisterende valgte perioder i kalender-redigering: evaluer
 * mors-aktivitet-alerten én gang per periode mot en felles ferdigberegnet
 * `morsUttakPerioder`-liste. Returnerer en ren funksjon konsumenten kaller
 * per periode under render.
 */
export const useEksisterendeValgtePeriodeAlerts = (): ((
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager,
) => { morsAktivitetIkkeValgt?: AktivAlert }) => {
    const {
        foreldreInfo: { rettighetType },
        uttakPerioder,
    } = useUttaksplanData();

    const morsUttakPerioder = uttakPerioder.filter(
        (p): p is UttakPeriode_fpoversikt => !erEøsUttakPeriode(p) && p.forelder === 'MOR',
    );

    return (periode) => ({
        morsAktivitetIkkeValgt: tilAktiv(MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE, {
            rettighetType,
            periode,
            morsUttakPerioder,
        }),
    });
};

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
