import { TilgjengeligStønadskonto, Periode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { SøkerRolle } from '../../types/søknad/Søknad';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { beregnGjenståendeUttaksdager } from '../uttaksPlanStatus';
import { getErSøkerFarEllerMedmor } from '../domain/personUtil';

export const getUttaksstatus = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    søkerrolle: SøkerRolle
) => {
    const uttaksstatus: Stønadskontouttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        uttaksplan,
        søkerrolle
    );
    if (getErSøkerFarEllerMedmor(søkerrolle)) {
        return uttaksstatus.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel);
    }
    return uttaksstatus;
};
