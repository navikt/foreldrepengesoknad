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

const finnAntallDagerÅTrekke = (dager: number, p: Periode): number => {
    if (isUttaksperiode(p)) {
        const periodeErGradert = p.stillingsprosent !== undefined;
        const periodeHarTrekkdagerPgaSenSøknad = p.trekkdager !== undefined;

        if (periodeErGradert && periodeHarTrekkdagerPgaSenSøknad) {
            const graderingsProsent = (100 - getFloatFromString(p.stillingsprosent)!) / 100;

            return p.trekkdager! + Math.floor(dager * graderingsProsent);
        } else if (periodeErGradert) {
            const graderingsProsent = (100 - getFloatFromString(p.stillingsprosent)!) / 100;

            return Math.floor(dager * graderingsProsent);
        } else if (periodeHarTrekkdagerPgaSenSøknad) {
            return dager + p.trekkdager!;
        } else {
            return dager;
        }
    }

    return dager;
};

export const beregnGjenståendeUttaksdager = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[]
) => {
    return tilgjengeligeStønadskontoer.map((konto): Stønadskontouttak => {
        let forelder: Forelder | undefined;
        let dagerGjenstående = konto.dager;
        const uttaksplanPerioder = uttaksplan.filter((p: Uttaksperiode) => p.konto === konto.konto);

        if (konto.konto === StønadskontoType.Mødrekvote) {
            forelder = Forelder.MOR;
        }

        if (konto.konto === StønadskontoType.Fedrekvote) {
            forelder = Forelder.FARMEDMOR;
        }

        if (uttaksplanPerioder) {
            uttaksplanPerioder.forEach((p: Periode) => {
                if (p.type !== Periodetype.Utsettelse && p.type !== Periodetype.Opphold) {
                    dagerGjenstående = dagerGjenstående - finnAntallDagerÅTrekke(Perioden(p).getAntallUttaksdager(), p);
                }
            });
        }

        return {
            konto: konto.konto,
            dagerGjenstående,
            forelder: forelder ? forelder : undefined
        };
    });
};
