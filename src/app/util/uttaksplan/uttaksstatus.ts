import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Stønadskontouttak
} from '../../types/uttaksplan/periodetyper';
import { beregnGjenståendeUttaksdager } from '../uttaksPlanStatus';
import { Søknadsinfo } from '../../selectors/types';

export interface Uttaksstatus {
    gjelderDagerBrukt: boolean;
    uttak: Stønadskontouttak[];
}

export const getUttaksstatus = (
    søknadsinfo: Søknadsinfo,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    uttaksplan: Periode[]
): Uttaksstatus => {
    const { søknaden, søker } = søknadsinfo;
    const gjelderDagerBrukt = skalBeregneAntallDagerBrukt(
        søknaden.erDeltUttak,
        søker.erFarEllerMedmor,
        søknaden.erEndringssøknad,
        søknaden.erEnkelEndringssøknadMedUttaksplan
    );
    const uttak: Stønadskontouttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        uttaksplan,
        gjelderDagerBrukt
    );
    return {
        gjelderDagerBrukt,
        uttak: søker.erFarEllerMedmor
            ? uttak.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel)
            : uttak
    };
};

export const skalBeregneAntallDagerBrukt = (
    erDeltUttak: boolean,
    erFarEllerMedmor: boolean,
    erEndringssøknad: boolean,
    erEnkelEndringssøknadMedUttaksplan: boolean
): boolean => (erEndringssøknad && erEnkelEndringssøknadMedUttaksplan !== true) || (erDeltUttak && erFarEllerMedmor);
