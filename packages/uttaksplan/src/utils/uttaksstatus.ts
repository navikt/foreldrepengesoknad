import { Periode } from 'types/Periode';
import { StønadskontoUttak } from 'types/StønadskontoUttak';
import { beregnGjenståendeUttaksdager } from './uttaksPlanStatus';
import { StønadskontoType, TilgjengeligStønadskonto } from '@navikt/fp-common';

export interface Uttaksstatus {
    gjelderDagerBrukt: boolean;
    uttak: StønadskontoUttak[];
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

    const uttak: StønadskontoUttak[] = beregnGjenståendeUttaksdager(
        tilgjengeligeStønadskontoer,
        uttaksplan,
        gjelderDagerBrukt,
    );
    return {
        gjelderDagerBrukt,
        uttak: erFarEllerMedmor
            ? uttak.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel)
            : uttak,
    };
};

export interface UttaksstatusFuncParams {
    erDeltUttak: boolean;
    erEndringssøknad: boolean;
    harKomplettUttaksplan: boolean;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    uttaksplan: Periode[];
}

export const getUttaksstatusFunc = ({
    erDeltUttak,
    erEndringssøknad,
    harKomplettUttaksplan,
    erFarEllerMedmor,
    tilgjengeligeStønadskontoer,
    uttaksplan,
}: UttaksstatusFuncParams): (() => Uttaksstatus) => {
    return () =>
        getUttaksstatus({
            erDeltUttak,
            erEndringssøknad,
            harKomplettUttaksplan,
            erFarEllerMedmor,
            tilgjengeligeStønadskontoer,
            uttaksplan,
        });
};
