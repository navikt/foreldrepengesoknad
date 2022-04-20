import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Stønadskontouttak,
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
    const {
        søknaden: { erDeltUttak, erEndringssøknad, harKomplettUttaksplan },
        søker,
    } = søknadsinfo;

    const gjelderDagerBrukt =
        (erEndringssøknad && harKomplettUttaksplan !== true) ||
        (erDeltUttak && søker.erFarEllerMedmor && harKomplettUttaksplan !== true);

    const uttak: Stønadskontouttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        uttaksplan,
        gjelderDagerBrukt
    );
    return {
        gjelderDagerBrukt,
        uttak: søker.erFarEllerMedmor
            ? uttak.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel)
            : uttak,
    };
};
