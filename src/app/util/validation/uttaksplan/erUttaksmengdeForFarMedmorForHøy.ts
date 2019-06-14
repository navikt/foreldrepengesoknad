import { Periode, TilgjengeligStønadskonto, Stønadskontouttak } from 'app/types/uttaksplan/periodetyper';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';

export const erUttaksmengdeForFarMedmorForHøy = (
    uttaksplan: Periode[],
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    farEllerMedmor: boolean
): boolean => {
    if (farEllerMedmor === true) {
        const kontoUttak = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, false);
        return kontoUttak.some((konto: Stønadskontouttak) => konto.dager < 0);
    } else {
        return false;
    }
};
