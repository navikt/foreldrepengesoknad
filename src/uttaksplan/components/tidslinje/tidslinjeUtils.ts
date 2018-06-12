import { InnslagPeriodetype } from './types';
import {
    Tidsperiode,
    Periodetype,
    Forelder,
    StønadskontoType,
    UtsettelseÅrsakType
} from '../../types';
import { perioderUtil } from '../../utils/dataUtils/periodeUtil';
import {
    getAntallUttaksdagerITidsperioder,
    tidsperiodeUtil
} from '../../utils/dataUtils';
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

export type Periodeoppsummering = Map<StønadskontoType, number>;

const normaliserStonadsperiodekonto = (
    konto: StønadskontoType
): StønadskontoType => {
    switch (konto) {
        case StønadskontoType.Mødrekvote:
            return StønadskontoType.Mødrekvote;
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
    const uttakTidsperioder = perioderUtil(innslag.perioderekke)
        .getUttak()
        .map((p) => p.tidsperiode);
    const ukerTotalt = getAntallUttaksdagerITidsperioder(uttakTidsperioder) / 5;
    const stonadsperioder = perioderUtil(innslag.perioderekke).getUttak();
    const perioder: Periodeoppsummering = new Map();
    stonadsperioder.forEach((p) => {
        const konto = normaliserStonadsperiodekonto(p.konto);
        const eksisterendeDager = perioder.get(konto) || 0;
        const nyeDager = tidsperiodeUtil(p.tidsperiode).getAntallUttaksdager();
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
    if (innslag.periode.type === Periodetype.Opphold) {
        return 'purple';
    }
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

export const getStondskontoTekstKey = (konto: StønadskontoType) => {
    switch (konto) {
        case StønadskontoType.Fellesperiode:
            return 'uttaksplan.stonadskonto.fellesperiode';
        case StønadskontoType.Fedrekvote:
            return 'uttaksplan.stonadskonto.fedrekvote';
        case StønadskontoType.Mødrekvote:
            return 'uttaksplan.stonadskonto.modrekvote';
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
