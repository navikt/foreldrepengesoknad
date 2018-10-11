import { TilgjengeligStønadskonto, Periode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { SøkerRolle } from '../../types/s\u00F8knad/S\u00F8knad';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { beregnGjenståendeUttaksdager } from '../uttaksPlanStatus';
import { erFarEllerMedmor } from '../domain/personUtil';

export const getUttaksstatus = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    søkerrolle: SøkerRolle
) => {
    const uttaksstatus: Stønadskontouttak[] = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan);
    if (erFarEllerMedmor(søkerrolle)) {
        return uttaksstatus.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel);
    }
    return uttaksstatus;
};
