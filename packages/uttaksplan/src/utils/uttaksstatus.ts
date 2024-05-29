import { Periode, StønadskontoType, beregnGjenståendeUttaksdager } from '@navikt/fp-common';
import { Stønadskonto, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

export interface Uttaksstatus {
    gjelderDagerBrukt: boolean;
    uttak: Stønadskonto[];
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
            ? uttak.filter((kontouttak) => kontouttak.konto !== StønadskontoType.ForeldrepengerFørFødsel)
            : uttak,
    };
};

export interface UttaksstatusFuncParams {
    erDeltUttak: boolean;
    erEndringssøknad: boolean;
    harKomplettUttaksplan: boolean;
    erFarEllerMedmor: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad;
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
