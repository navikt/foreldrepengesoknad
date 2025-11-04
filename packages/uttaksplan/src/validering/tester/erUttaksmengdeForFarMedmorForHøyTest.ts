import { Periode, PeriodeInfoType, Søknadsinfo, isInfoPeriodeAnnenPart, isUttaksperiode } from '@navikt/fp-common';
import { KontoBeregningDto_fpoversikt } from '@navikt/fp-types';

import { beregnGjenståendeUttaksdager } from '../../utils/uttaksPlanStatus';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

const harSøktOmFellesperiode = (periode: Periode) => {
    if (isUttaksperiode(periode)) {
        if (periode.forelder === 'FAR_MEDMOR' && periode.konto === 'FELLESPERIODE') {
            return true;
        }
    }

    return false;
};

const erUttaksmengdeForFarMedmorForHøy = (
    uttaksplan: Periode[],
    tilgjengeligeStønadskontoer: KontoBeregningDto_fpoversikt,
    farEllerMedmor: boolean,
): boolean => {
    const harFarMedmorSøktOmFellesperiode = uttaksplan.some((p) => harSøktOmFellesperiode(p));

    const perioderSomSkalBrukes = uttaksplan.filter((p) => {
        if (harFarMedmorSøktOmFellesperiode) {
            return true;
        }

        if (
            isInfoPeriodeAnnenPart(p) &&
            p.infotype === PeriodeInfoType.uttakAnnenPart &&
            p.årsak === 'UTTAK_FELLESP_ANNEN_FORELDER'
        ) {
            return false;
        }

        return true;
    });

    if (farEllerMedmor === true) {
        const kontoUttak = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, perioderSomSkalBrukes, false);
        return kontoUttak.some((konto) => konto.dager < 0);
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
