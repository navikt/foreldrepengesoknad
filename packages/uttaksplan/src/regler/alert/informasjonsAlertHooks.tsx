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
import { ForeldreInfo } from '../../types/ForeldreInfo';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { erDetReadonlyPerioderEtterValgtePerioder } from '../../utils/periodeUtils';
import { Periode } from '../types';
import {
    ADOPSJON_PERIODE_FØR_FAMHEND,
    ForskyvEllerErstattKontekst,
    GRADERINGSAKTIVITET_IKKE_VALGT_EKSISTERENDE,
    IKKE_REDIGERBAR_EØS,
    IKKE_REDIGERBAR_PLEIEPENGER,
    KAN_MISTE_DAGER,
    MANGLER_GRADERINGSAKTIVITET_KALENDER,
    MANGLER_GRADERINGSAKTIVITET_LISTE,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MANGLER_MORS_AKTIVITET_LISTE,
    MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE,
    PeriodeDetaljerKontekst,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGER_FØR_FAMHEND,
    VALGTE_DAGER_FØR_SEKS_UKER,
} from './informasjonsAlerts';
import { AktivAlertMetadata, Alertregel, AlertregelDoc } from './types';

/**
 * Listepanelet skal varsle om at mor kan miste dager når hun endrer en
 * periode til ferie/opphold, og når en eller flere eksisterende perioder
 * mangler valg av mors aktivitet. Mor-aktivitet-flagget regnes ut høyere
 * oppe (over hele uttaksplanen) og mates inn som input.
 */
export const useListePanelInfoAlerts = (input: {
    valgtPeriode: { fom: string; tom: string } | undefined;
    harValgtFerieEllerOpphold: boolean;
    harPeriodeDerMorsAktivitetIkkeErValgt: boolean;
}): ListePanelInfoAlerts => {
    const {
        foreldreInfo: { søker },
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
        kanMisteDagerVedFerie: visKanMisteDager ? aktivFraMetadata(KAN_MISTE_DAGER) : undefined,
        morsAktivitetIkkeOppgitt: input.harPeriodeDerMorsAktivitetIkkeErValgt
            ? aktivFraMetadata(MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING)
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
) => { morsAktivitetIkkeValgt?: AktivAlertMetadata; graderingsaktivitetIkkeValgt?: AktivAlertMetadata }) => {
    const {
        foreldreInfo: { rettighetType, søker },
        uttakPerioder,
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const morsUttakPerioder = uttakPerioder.filter(
        (p): p is UttakPeriode_fpoversikt => !erEøsUttakPeriode(p) && p.forelder === 'MOR',
    );

    return (periode) => ({
        morsAktivitetIkkeValgt: tilAktiv(MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE, {
            rettighetType,
            søker,
            periode,
            morsUttakPerioder,
        }),
        graderingsaktivitetIkkeValgt:
            kanVelgeArbeidsgiver && erSøkersIkkeEøsPeriode(periode, søker)
                ? tilAktiv(GRADERINGSAKTIVITET_IKKE_VALGT_EKSISTERENDE, { periode, søker })
                : undefined,
    });
};

/** Alerter som vises over hele listevisningen. */
export const useUttaksplanListeAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): UttaksplanListeAlerts => {
    const {
        foreldreInfo: { rettighetType, søker },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();
    return {
        manglerMorsAktivitetAlert: tilAktiv(MANGLER_MORS_AKTIVITET_LISTE, { rettighetType, søker, perioder }),
        manglerGraderingsaktivitetAlert: kanVelgeArbeidsgiver
            ? tilAktiv(MANGLER_GRADERINGSAKTIVITET_LISTE, {
                  perioder: filtrerSøkersIkkeEøsPerioder(perioder, søker),
                  søker,
              })
            : undefined,
    };
};

/** Alerter som vises over hele kalendervisningen. */
export const useUttaksplanKalenderAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): UttaksplanKalenderAlerts => {
    const {
        foreldreInfo: { rettighetType, søker },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();
    return {
        manglerMorsAktivitetAlert: tilAktiv(MANGLER_MORS_AKTIVITET_KALENDER, { rettighetType, søker, perioder }),
        manglerGraderingsaktivitetAlert: kanVelgeArbeidsgiver
            ? tilAktiv(MANGLER_GRADERINGSAKTIVITET_KALENDER, {
                  perioder: filtrerSøkersIkkeEøsPerioder(perioder, søker),
                  søker,
              })
            : undefined,
    };
};

/** Informasjons-alerter i legg-til/endre-periode-skjemaet. */
export const useLeggTilEndreSkjemaInfoAlerts = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
): LeggTilEndreSkjemaInfoAlerts => {
    const {
        foreldreInfo: { rettighetType, søker },
    } = useUttaksplanData();
    return {
        morsAktivitetIkkeOppgittAlert: tilAktiv(MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING, {
            rettighetType,
            søker,
            perioder,
        }),
    };
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

/** Alerter i forskyv- og erstatt-panelene. */
const useForskyvEllerErstattAlerts = (input: {
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

    const annenPart = søker === 'MOR' ? 'FAR_MEDMOR' : 'MOR';
    const forelderSomHarLåstePerioder = erPeriodeneTilAnnenPartLåst ? annenPart : undefined;
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

/**
 * Når «Endre og flytt resten av planen» ikke er mulig (det finnes blokkerende
 * forhold – senere låste perioder eller valgte dager før/rundt familiehendelsen)
 * er «Endre uten å flytte resten av planen» det eneste mulige valget. Da skal vi
 * ikke stille spørsmålet «Hva skal skje med resten av planen?», men utføre
 * endringen direkte uten å flytte resten av planen.
 */
export const useKanKunErstatte = (input: {
    valgtePerioder: readonly Periode[];
    erFerie?: boolean;
    erGradert?: boolean;
}): boolean => {
    const { senerePerioderReadonly, valgteDagerFørSeksUker, valgteDagerFørFamhend } =
        useForskyvEllerErstattAlerts(input);

    return Boolean(senerePerioderReadonly || valgteDagerFørSeksUker || valgteDagerFørFamhend);
};

const tilAktiv = <T,>(regel: Alertregel<T>, ctx: T): AktivAlertMetadata | undefined =>
    regel.skalVises(ctx) ? { melding: regel.getMelding(ctx), variant: regel.variant } : undefined;

const erSøkersIkkeEøsPeriode = (
    periode: Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager,
    søker: ForeldreInfo['søker'],
): boolean => erVanligUttakPeriode(periode) && periode.forelder === søker;

const filtrerSøkersIkkeEøsPerioder = (
    perioder: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>,
    søker: ForeldreInfo['søker'],
) => perioder.filter((p) => erSøkersIkkeEøsPeriode(p, søker));

/**
 * Bygg ein AktivAlertMetadata kun fra metadataen på regelen — uten å evaluere
 * `skalVises` eller `getMelding`. Brukes når kallstedet allerede har
 * regnet ut betingelsen selv (typisk fordi konteksten ikke matcher
 * regelens runtime-kontrakt). Bruker `meldinger[0]` direkte, så den
 * skal kun brukes på regler med én meldingsvariant.
 */
const aktivFraMetadata = (regel: AlertregelDoc): AktivAlertMetadata => ({
    melding: regel.meldinger[0],
    variant: regel.variant,
});
type ListePanelInfoAlerts = {
    kanMisteDagerVedFerie?: AktivAlertMetadata;
    morsAktivitetIkkeOppgitt?: AktivAlertMetadata;
};
type UttaksplanListeAlerts = {
    manglerMorsAktivitetAlert?: AktivAlertMetadata;
    manglerGraderingsaktivitetAlert?: AktivAlertMetadata;
};
type UttaksplanKalenderAlerts = {
    manglerMorsAktivitetAlert?: AktivAlertMetadata;
    manglerGraderingsaktivitetAlert?: AktivAlertMetadata;
};
type LeggTilEndreSkjemaInfoAlerts = {
    morsAktivitetIkkeOppgittAlert?: AktivAlertMetadata;
};
type PeriodeDetaljerAlerts = {
    adopsjonFørFamhend?: AktivAlertMetadata;
    eøs?: AktivAlertMetadata;
    pleiepenger?: AktivAlertMetadata;
    kanMisteDager?: AktivAlertMetadata;
};
type ForskyvEllerErstattAlerts = {
    senerePerioderReadonly?: AktivAlertMetadata;
    valgteDagerFørSeksUker?: AktivAlertMetadata;
    valgteDagerFørFamhend?: AktivAlertMetadata;
};
