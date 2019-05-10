import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Stønadskontouttak
} from '../../types/uttaksplan/periodetyper';
import { beregnGjenståendeUttaksdager } from '../uttaksPlanStatus';
import { Søknadsinfo } from '../../selectors/types';

export const getUttaksstatus = (
    søknadsinfo: Søknadsinfo,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[]
): Stønadskontouttak[] => {
    const { søknaden, søker } = søknadsinfo;
    const uttaksstatus: Stønadskontouttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        uttaksplan,
        skalBeregneAntallDagerBrukt(
            søknaden.erDeltUttak,
            søker.erFarEllerMedmor,
            søknaden.erEndringssøknad,
            søknaden.erEnkelEndringssøknadMedUttaksplan
        )
    );
    if (søker.erFarEllerMedmor) {
        return uttaksstatus.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel);
    }
    return uttaksstatus;
};

export const skalBeregneAntallDagerBrukt = (
    erDeltUttak: boolean,
    erFarEllerMedmor: boolean,
    erEndringssøknad: boolean,
    erEnkelEndringssøknadMedUttaksplan: boolean
): boolean => (erEndringssøknad && erEnkelEndringssøknadMedUttaksplan !== true) || (erDeltUttak && erFarEllerMedmor);
