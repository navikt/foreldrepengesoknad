import {
    TilgjengeligStønadskonto,
    Periode,
    Uttaksperiode,
    StønadskontoType,
    isUttaksperiode,
    Periodetype
} from '../types/uttaksplan/periodetyper';
import { Stønadskontouttak } from '../components/uttaksoppsummering/Uttaksoppsummering';
import { Forelder } from 'common/types';
import { Perioden } from './uttaksplan/Perioden';
import { getFloatFromString } from 'common/util/numberUtils';

export const finnAntallDagerÅTrekke = (dager: number, p: Periode): number => {
    if (isUttaksperiode(p)) {
        const periodeErGradert = p.stillingsprosent !== undefined;
        const periodeErSamtidigUttak = p.samtidigUttakProsent !== undefined;

        if (periodeErSamtidigUttak) {
            return Math.floor(dager * (getFloatFromString(p.samtidigUttakProsent)! / 100));
        } else if (periodeErGradert) {
            const graderingsProsent = (100 - getFloatFromString(p.stillingsprosent)!) / 100;

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
    return tilgjengeligeStønadskontoer.map((konto): Stønadskontouttak => {
        let forelder: Forelder | undefined;
        let antallDager = beregnDagerBrukt ? 0 : konto.dager;
        const uttaksplanPerioder = uttaksplan.filter((p: Uttaksperiode) => p.konto === konto.konto);

        if (konto.konto === StønadskontoType.Mødrekvote) {
            forelder = Forelder.MOR;
        }

        if (konto.konto === StønadskontoType.Fedrekvote) {
            forelder = Forelder.FARMEDMOR;
        }

        if (uttaksplanPerioder) {
            uttaksplanPerioder.forEach((p: Periode) => {
                if (
                    p.type !== Periodetype.Utsettelse &&
                    p.type !== Periodetype.Opphold &&
                    p.type !== Periodetype.Hull
                ) {
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
