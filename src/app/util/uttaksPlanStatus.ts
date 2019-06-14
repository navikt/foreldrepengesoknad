import {
    TilgjengeligStønadskonto,
    Periode,
    Uttaksperiode,
    isUttaksperiode,
    Periodetype,
    Oppholdsperiode,
    Stønadskontouttak,
    isAvslåttPeriode,
    InfoPeriode,
    PeriodeInfoType,
    Overføringsperiode,
    isOppholdsperiode,
    isOverføringsperiode,
    isInfoPeriode,
    UttakAnnenPartInfoPeriode
} from '../types/uttaksplan/periodetyper';
import { Perioden } from './uttaksplan/Perioden';
import { getFloatFromString } from 'common/util/numberUtils';
import { getStønadskontoFromOppholdsårsak } from './uttaksplan/uttaksperiodeUtils';
import { trimPerioderIGruppertInfoPeriode } from './uttaksplan/gruppertInfoPeriodeUtils';
import { getStønadskontoTypeFromOppholdÅrsakType } from './eksisterendeSak/eksisterendeSakUtils';

export const finnAntallDagerÅTrekke = (periode: Periode): number => {
    const dager = Perioden(periode).getAntallUttaksdager();
    if (isUttaksperiode(periode)) {
        const periodeErGradert = periode.stillingsprosent !== undefined;
        const periodeErSamtidigUttak = periode.samtidigUttakProsent !== undefined;

        if (periodeErSamtidigUttak) {
            return dager * (getFloatFromString(periode.samtidigUttakProsent)! / 100);
        } else if (periodeErGradert) {
            const graderingsProsent = (100 - getFloatFromString(periode.stillingsprosent)!) / 100;

            return dager * graderingsProsent;
        } else {
            return dager;
        }
    }
    return dager;
};

export const getAllePerioderMedUttaksinfoFraUttaksplan = (perioder: Periode[]): Uttaksperiode[] => {
    return [
        ...perioder.filter(isUttaksperiode),
        ...getUttakFraOppholdsperioder(perioder.filter(isOppholdsperiode)),
        ...getUttakFraOverføringsperioder(perioder.filter(isOverføringsperiode)),
        ...getUttakFraInfoperioder(perioder.filter(isInfoPeriode))
    ];
};

export const beregnGjenståendeUttaksdager = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    beregnDagerBrukt: boolean
): Stønadskontouttak[] => {
    const alleUttakIUttaksplan = getAllePerioderMedUttaksinfoFraUttaksplan(uttaksplan);
    return tilgjengeligeStønadskontoer.map((konto): Stønadskontouttak => {
        let antallDager = beregnDagerBrukt ? 0 : konto.dager;
        const uttaksplanPerioder = alleUttakIUttaksplan.filter((p) => p.konto === konto.konto);

        if (uttaksplanPerioder) {
            uttaksplanPerioder.forEach((p: Periode) => {
                if (p.type === Periodetype.Uttak || p.type === Periodetype.Overføring || isAvslåttPeriode(p)) {
                    antallDager = beregnDagerBrukt
                        ? antallDager + finnAntallDagerÅTrekke(p)
                        : antallDager - finnAntallDagerÅTrekke(p);
                }
            });

            antallDager = beregnDagerBrukt ? Math.floor(antallDager) : Math.ceil(antallDager);
        }

        return {
            konto: konto.konto,
            dager: antallDager
        };
    });
};

export const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[]
): Stønadskontouttak[] => {
    return beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, true);
};

const getUttakFraOppholdsperioder = (oppholdsperioder: Oppholdsperiode[]): Uttaksperiode[] => {
    if (oppholdsperioder.length === 0) {
        return [];
    }
    return oppholdsperioder.map((opphold: Oppholdsperiode): Uttaksperiode => ({
        id: opphold.id,
        tidsperiode: opphold.tidsperiode,
        type: Periodetype.Uttak,
        konto: getStønadskontoFromOppholdsårsak(opphold.årsak)!,
        forelder: opphold.forelder
    }));
};
const getUttakFraOverføringsperioder = (overføringer: Overføringsperiode[]): Uttaksperiode[] => {
    if (overføringer.length === 0) {
        return [];
    }
    return overføringer.map((overføring): Uttaksperiode => ({
        id: overføring.id,
        tidsperiode: overføring.tidsperiode,
        type: Periodetype.Uttak,
        konto: overføring.konto,
        forelder: overføring.forelder
    }));
};

const getUttakFraInfoperioder = (perioder: InfoPeriode[]): Uttaksperiode[] => {
    if (perioder.length === 0) {
        return [];
    }
    const oppholdAnnenPart: UttakAnnenPartInfoPeriode[] = [];
    perioder.filter((periode) => isAvslåttPeriode(periode) === false).forEach((periode) => {
        if (periode.infotype === PeriodeInfoType.uttakAnnenPart) {
            oppholdAnnenPart.push(periode);
        } else if (periode.infotype === PeriodeInfoType.gruppertInfo) {
            const perioderInnenforPeriodeTidsrom = trimPerioderIGruppertInfoPeriode(periode);
            perioderInnenforPeriodeTidsrom.forEach((p) => {
                if (p.infotype === PeriodeInfoType.uttakAnnenPart) {
                    oppholdAnnenPart.push(p);
                }
            });
        }
    });
    return oppholdAnnenPart.map((periode): Uttaksperiode => {
        return {
            id: periode.id,
            tidsperiode: periode.tidsperiode,
            type: Periodetype.Uttak,
            konto: getStønadskontoTypeFromOppholdÅrsakType(periode.årsak),
            forelder: periode.forelder
        };
    });
};
