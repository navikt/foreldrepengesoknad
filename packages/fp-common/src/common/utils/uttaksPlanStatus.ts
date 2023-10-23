import { Perioden } from './Perioden';
import { getStønadskontoFromOppholdsårsak } from './periodeUtils';
import { getFloatFromString } from './numberUtils';
import {
    AvslåttPeriode,
    InfoPeriode,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    PeriodeInfoType,
    Periodetype,
    StønadskontoUttak,
    TilgjengeligStønadskonto,
    UttakAnnenPartInfoPeriode,
    Uttaksperiode,
    isAvslåttPeriode,
    isInfoPeriode,
    isOppholdsperiode,
    isOverføringsperiode,
    isUttaksperiode,
} from '../types';

export const finnAntallDagerÅTrekke = (periode: Periode): number => {
    const dager = Perioden(periode).getAntallUttaksdager();
    if (isUttaksperiode(periode)) {
        const periodeErGradert = periode.stillingsprosent !== undefined;
        const periodeErSamtidigUttak = periode.samtidigUttakProsent !== undefined;

        if ((periodeErGradert && periodeErSamtidigUttak) || periodeErGradert) {
            const graderingsProsent = (100 - getFloatFromString(periode.stillingsprosent)!) / 100;

            return dager * graderingsProsent;
        } else if (periodeErSamtidigUttak) {
            return dager * (getFloatFromString(periode.samtidigUttakProsent)! / 100);
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
        ...getUttakFraInfoperioder(perioder.filter(isInfoPeriode)),
        ...getUttakFraAvslåttePerioder(perioder.filter(isAvslåttPeriode)),
    ];
};

export const beregnGjenståendeUttaksdager = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    beregnDagerBrukt: boolean,
): StønadskontoUttak[] => {
    const alleUttakIUttaksplan = getAllePerioderMedUttaksinfoFraUttaksplan(uttaksplan);
    return tilgjengeligeStønadskontoer.map((konto): StønadskontoUttak => {
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
            dager: antallDager,
        };
    });
};

export const beregnBrukteUttaksdager = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
): StønadskontoUttak[] => {
    return beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, true);
};

const getUttakFraOppholdsperioder = (oppholdsperioder: Oppholdsperiode[]): Uttaksperiode[] => {
    if (oppholdsperioder.length === 0) {
        return [];
    }
    return oppholdsperioder.map(
        (opphold: Oppholdsperiode): Uttaksperiode => ({
            id: opphold.id,
            tidsperiode: opphold.tidsperiode,
            type: Periodetype.Uttak,
            konto: getStønadskontoFromOppholdsårsak(opphold.årsak)!,
            forelder: opphold.forelder,
        }),
    );
};
const getUttakFraOverføringsperioder = (overføringer: Overføringsperiode[]): Uttaksperiode[] => {
    if (overføringer.length === 0) {
        return [];
    }
    return overføringer.map(
        (overføring): Uttaksperiode => ({
            id: overføring.id,
            tidsperiode: overføring.tidsperiode,
            type: Periodetype.Uttak,
            konto: overføring.konto,
            forelder: overføring.forelder,
        }),
    );
};

const getUttakFraInfoperioder = (perioder: InfoPeriode[]): Uttaksperiode[] => {
    if (perioder.length === 0) {
        return [];
    }
    const oppholdAnnenPart: UttakAnnenPartInfoPeriode[] = [];
    perioder
        .filter((periode) => isAvslåttPeriode(periode) === false)
        .forEach((periode) => {
            if (periode.infotype === PeriodeInfoType.uttakAnnenPart) {
                oppholdAnnenPart.push(periode);
            }
        });
    return oppholdAnnenPart.map((periode): Uttaksperiode => {
        const { type, årsak, ...rest } = periode;
        return {
            type: Periodetype.Uttak,
            konto: getStønadskontoFromOppholdsårsak(periode.årsak),
            ...rest,
        };
    });
};

const getUttakFraAvslåttePerioder = (perioder: AvslåttPeriode[]): Uttaksperiode[] => {
    if (perioder.length === 0) {
        return [];
    }

    return perioder
        .filter((p) => p.avslåttPeriodeType === Periodetype.Uttak || p.avslåttPeriodeType === Periodetype.Utsettelse)
        .map(
            (periode): Uttaksperiode => ({
                type: Periodetype.Uttak,
                konto: periode.kontoType!,
                tidsperiode: periode.tidsperiode,
                id: periode.id,
                forelder: periode.forelder,
            }),
        );
};
