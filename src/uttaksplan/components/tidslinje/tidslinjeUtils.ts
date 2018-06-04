import { InnslagPeriodetype } from './types';
import {
    Tidsperiode,
    Periodetype,
    Forelder,
    StonadskontoType,
    UtsettelseÅrsakType
} from '../../types';
import { getStonadsperioder } from '../../utils/periodeUtils';
import {
    getAntallUttaksdagerITidsperiode,
    getAntallUttaksdagerIPerioder
} from '../../utils/uttaksdagerUtils';
import { CalloutBorderColor } from 'uttaksplan/components/callout/Callout';

/**
 * Oppsummerer et periodeinnslag
 * @param innslag
 */

export interface SammenslattPeriodeOppsummering {
    ukerTotalt: number;
    tidsperiode: Tidsperiode;
    perioder: Periodeoppsummering;
}

export type Periodeoppsummering = Map<StonadskontoType, number>;

const normaliserStonadsperiodekonto = (
    konto: StonadskontoType
): StonadskontoType => {
    switch (konto) {
        case StonadskontoType.Modrekvote:
        case StonadskontoType.ModrekvotePakrevd:
            return StonadskontoType.Modrekvote;
        default:
            return konto;
    }
};

/**
 * Går gjennom alle perioder i en perioderekke og summerer opp antall
 * dager som er brukt per StonadskontoType
 * @param innslag
 */
export const oppsummerPerioder = (
    innslag: InnslagPeriodetype
): SammenslattPeriodeOppsummering => {
    const tidsperiode: Tidsperiode = {
        startdato: innslag.perioderekke[0].tidsperiode.startdato,
        sluttdato:
            innslag.perioderekke[innslag.perioderekke.length - 1].tidsperiode
                .sluttdato
    };
    const ukerTotalt = getAntallUttaksdagerIPerioder(innslag.perioderekke) / 5;
    const stonadsperioder = getStonadsperioder(innslag.perioderekke);
    const perioder: Periodeoppsummering = new Map();
    stonadsperioder.forEach((p) => {
        const konto = normaliserStonadsperiodekonto(p.konto);
        const eksisterendeDager = perioder.get(konto) || 0;
        const nyeDager = getAntallUttaksdagerITidsperiode(p.tidsperiode);
        perioder.set(konto, eksisterendeDager + nyeDager);
    });
    perioder.forEach((value, key) => perioder.set(key, value / 5));
    return {
        ukerTotalt,
        perioder,
        tidsperiode
    };
};

/**
 * Finner riktig farge gitt periodetype
 * @param innslag
 */
export const getInnslagfarge = (
    innslag: InnslagPeriodetype
): CalloutBorderColor => {
    if (innslag.periode.type === Periodetype.Utsettelse) {
        return 'green';
    }
    if (innslag.periode.forelder === 'forelder1') {
        return 'purple';
    }
    return 'blue';
};

/**
 * Sjekker om forrige innslag har samme forelder
 * @param innslag
 */
export const innslagErFortsettelse = (innslag: InnslagPeriodetype): boolean =>
    innslag.perioderekke.length > 1 &&
    innslag.perioderekke.findIndex((p) => p === innslag.periode) > 0;

export const innslagFortsetter = (innslag: InnslagPeriodetype): boolean =>
    innslag.perioderekke.length > 1 &&
    innslag.perioderekke.findIndex((p) => p === innslag.periode) <
        innslag.perioderekke.length - 1;

export const getForelderNavn = (
    forelder: Forelder,
    navnForelder1: string,
    navnForelder2: string
): string => (forelder === 'forelder1' ? navnForelder1 : navnForelder2);

export const getStondskontoTekstKey = (konto: StonadskontoType) => {
    switch (konto) {
        case StonadskontoType.Fellesperiode:
            return 'uttaksplan.stonadskonto.fellesperiode';
        case StonadskontoType.Fedrekvote:
            return 'uttaksplan.stonadskonto.fedrekvote';
        case StonadskontoType.Modrekvote:
            return 'uttaksplan.stonadskonto.modrekvote';
        case StonadskontoType.ModrekvotePakrevd:
            return 'uttaksplan.stonadskonto.modrekvotePakrevd';
        default:
            return 'uttaksplan.stonadskonto.foreldrepenger';
    }
};

export const getÅrsakTekstKey = (årsak: UtsettelseÅrsakType) => {
    switch (årsak) {
        case UtsettelseÅrsakType.Arbeid:
            return 'uttaksplan.opphold.årsak.Arbeid';
        default:
            return 'uttaksplan.opphold.årsak.Ferie';
    }
};
