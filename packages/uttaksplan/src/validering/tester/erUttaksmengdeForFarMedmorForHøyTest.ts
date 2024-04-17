import {
    Forelder,
    OppholdÅrsakType,
    Periode,
    PeriodeInfoType,
    StønadskontoType,
    StønadskontoUttak,
    Søknadsinfo,
    TilgjengeligStønadskonto,
    beregnGjenståendeUttaksdager,
    isInfoPeriodeAnnenPart,
    isUttaksperiode,
} from '@navikt/fp-common';

import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

const harSøktOmFellesperiode = (periode: Periode) => {
    if (isUttaksperiode(periode)) {
        if (periode.forelder === Forelder.farMedmor && periode.konto === StønadskontoType.Fellesperiode) {
            return true;
        }
    }

    return false;
};

const erUttaksmengdeForFarMedmorForHøy = (
    uttaksplan: Periode[],
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    farEllerMedmor: boolean,
): boolean => {
    const harFarMedmorSøktOmFellesperiode = uttaksplan.find((p) => harSøktOmFellesperiode(p)) !== undefined;

    const perioderSomSkalBrukes = uttaksplan.filter((p) => {
        if (harFarMedmorSøktOmFellesperiode) {
            return true;
        }

        if (
            isInfoPeriodeAnnenPart(p) &&
            p.infotype === PeriodeInfoType.uttakAnnenPart &&
            p.årsak === OppholdÅrsakType.UttakFellesperiodeAnnenForelder
        ) {
            return false;
        }

        return true;
    });

    if (farEllerMedmor === true) {
        const kontoUttak = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, perioderSomSkalBrukes, false);
        return kontoUttak.some((konto: StønadskontoUttak) => konto.dager < 0);
    } else {
        return false;
    }
};

export const erUttaksmengdeForFarMedmorForHøyTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    return {
        passerer:
            erUttaksmengdeForFarMedmorForHøy(
                grunnlag.perioder,
                grunnlag.stønadskontoer,
                grunnlag.søkerErFarEllerMedmor,
            ) === false,
    };
};
