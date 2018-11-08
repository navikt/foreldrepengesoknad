import { TilgjengeligStønadskonto, Periode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { SøkerRolle } from '../../types/søknad/Søknad';
import { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { beregnGjenståendeUttaksdager } from '../uttaksPlanStatus';
import { getErSøkerFarEllerMedmor } from '../domain/personUtil';
import { getErDeltUttak } from './forslag/util';

export const getUttaksstatus = (
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[],
    søkerrolle: SøkerRolle,
    erEndringssøknad: boolean
) => {
    const erDeltUttak = getErDeltUttak(tilgjengeligeStønadskontoer);
    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkerrolle);
    const uttaksstatus: Stønadskontouttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        uttaksplan,
        skalBeregneAntallDagerBrukt(erDeltUttak, erFarEllerMedmor, erEndringssøknad)
    );
    if (erFarEllerMedmor) {
        return uttaksstatus.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel);
    }
    return uttaksstatus;
};

export const skalBeregneAntallDagerBrukt = (
    erDeltUttak: boolean,
    erFarEllerMedmor: boolean,
    erEndringssøknad: boolean
): boolean => erEndringssøknad || (erDeltUttak && erFarEllerMedmor);
