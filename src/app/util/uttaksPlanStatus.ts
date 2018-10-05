import {
    TilgjengeligStønadskonto,
    Periode,
    Uttaksperiode,
    StønadskontoType,
    isUttaksperiode
} from '../types/uttaksplan/periodetyper';
import { Stønadskontouttak } from '../components/uttaksoppsummering/Uttaksoppsummering';
import { Forelder } from 'common/types';
import { Perioden } from './uttaksplan/Perioden';

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
                if (isUttaksperiode(p)) {
                    dagerGjenstående =
                        p.trekkdager !== undefined
                            ? dagerGjenstående - p.trekkdager
                            : dagerGjenstående - Perioden(p).getAntallUttaksdager();
                } else {
                    dagerGjenstående = dagerGjenstående - Perioden(p).getAntallUttaksdager();
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
