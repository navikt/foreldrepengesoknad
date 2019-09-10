import {
    TilgjengeligStønadskonto,
    Periode,
    StønadskontoType,
    Stønadskontouttak,
    isAnnenPartInfoPeriode
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
    uttaksplan: Periode[],
    doNotIncludeAnnenPartsUttak: boolean = false
): Uttaksstatus => {
    const {
        søknaden: { erDeltUttak, erEndringssøknad, harKomplettUttaksplan },
        søker
    } = søknadsinfo;

    const gjelderDagerBrukt =
        (erEndringssøknad && harKomplettUttaksplan !== true) ||
        (erDeltUttak && søker.erFarEllerMedmor && harKomplettUttaksplan !== true);

    if (doNotIncludeAnnenPartsUttak) {
        uttaksplan = uttaksplan.filter((p) => !isAnnenPartInfoPeriode(p));
    }

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
