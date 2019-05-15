import {
    TilgjengeligStønadskonto,
    Periode,
    Uttaksperiode,
    StønadskontoType,
    isUttaksperiode,
    Periodetype,
    Oppholdsperiode,
    Stønadskontouttak,
    isAvslåttPeriode
} from '../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import { Perioden } from './uttaksplan/Perioden';
import { Periodene } from './uttaksplan/Periodene';
import { getStønadskontoFromOppholdsårsak } from './uttaksplan/uttaksperiodeUtils';

export const finnAntallDagerÅTrekke = (dager: number, p: Periode): number => {
    if (isUttaksperiode(p)) {
        const periodeErGradert = p.stillingsprosent !== undefined;
        const periodeErSamtidigUttak = p.samtidigUttakProsent !== undefined;

        if (periodeErSamtidigUttak) {
            return Math.floor(dager * (p.samtidigUttakProsent! / 100));
        } else if (periodeErGradert) {
            const graderingsProsent = (100 - p.stillingsprosent!) / 100;

            return Math.floor(dager * graderingsProsent);
        } else {
            return dager;
        }
    }

    return dager;
};

export const beregnGjenståendeUttaksdager = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    beregnDagerBrukt: boolean
): Stønadskontouttak[] => {
    const uttakFraOppholdsperiode: Periode[] = getUttakFraOppholdsperioder(Periodene(uttaksplan).getOpphold());
    const alleUttakIUttaksplan = [...uttaksplan, ...uttakFraOppholdsperiode];

    return tilgjengeligeStønadskontoer.map((konto): Stønadskontouttak => {
        let forelder: Forelder | undefined;
        let antallDager = beregnDagerBrukt ? 0 : konto.dager;
        const uttaksplanPerioder = alleUttakIUttaksplan.filter((p: Uttaksperiode) => p.konto === konto.konto);

        if (konto.konto === StønadskontoType.Mødrekvote) {
            forelder = Forelder.MOR;
        }

        if (konto.konto === StønadskontoType.Fedrekvote) {
            forelder = Forelder.FARMEDMOR;
        }

        if (uttaksplanPerioder) {
            uttaksplanPerioder.forEach((p: Periode) => {
                if (p.type === Periodetype.Uttak || p.type === Periodetype.Overføring || isAvslåttPeriode(p)) {
                    antallDager = beregnDagerBrukt
                        ? antallDager + finnAntallDagerÅTrekke(Perioden(p).getAntallUttaksdager(), p)
                        : antallDager - finnAntallDagerÅTrekke(Perioden(p).getAntallUttaksdager(), p);
                }
            });
        }

        return {
            konto: konto.konto,
            antallDager,
            forelder: forelder ? forelder : undefined
        };
    });
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
