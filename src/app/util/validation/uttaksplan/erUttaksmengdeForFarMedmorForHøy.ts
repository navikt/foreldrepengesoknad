import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { SøkerRolle } from 'app/types/søknad/Søknad';
import { beregnGjenståendeUttaksdager } from 'app/util/uttaksPlanStatus';
import { Stønadskontouttak } from 'app/components/uttaksoppsummering/Uttaksoppsummering';

export const erUttaksmengdeForFarMedmorForHøy = (
    uttaksplan: Periode[],
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    farEllerMedmor: boolean
): boolean => {
    if (farEllerMedmor === true) {
        const kontoUttak = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, SøkerRolle.MOR);
        return kontoUttak.some((konto: Stønadskontouttak) => konto.dagerGjenstående < 0);
    } else {
        return false;
    }
};
