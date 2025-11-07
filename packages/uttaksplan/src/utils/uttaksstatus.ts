import { Periode } from '@navikt/fp-common';
import { KontoBeregningDto, KontoDto } from '@navikt/fp-types';

import { beregnGjenståendeUttaksdager } from './uttaksPlanStatus';

export interface Uttaksstatus {
    gjelderDagerBrukt: boolean;
    uttak: KontoDto[];
}

export const getUttaksstatus = ({
    erDeltUttak,
    erEndringssøknad,
    harKomplettUttaksplan,
    erFarEllerMedmor,
    tilgjengeligeStønadskontoer,
    uttaksplan,
}: UttaksstatusFuncParams): Uttaksstatus => {
    const gjelderDagerBrukt =
        (erEndringssøknad && harKomplettUttaksplan !== true) ||
        (erDeltUttak && erFarEllerMedmor && harKomplettUttaksplan !== true);

    const uttak = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, gjelderDagerBrukt);
    return {
        gjelderDagerBrukt,
        uttak: erFarEllerMedmor
            ? uttak.filter((kontouttak) => kontouttak.konto !== 'FORELDREPENGER_FØR_FØDSEL')
            : uttak,
    };
};

interface UttaksstatusFuncParams {
    erDeltUttak: boolean;
    erEndringssøknad: boolean;
    harKomplettUttaksplan: boolean;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: KontoBeregningDto;
    uttaksplan: Periode[];
}
