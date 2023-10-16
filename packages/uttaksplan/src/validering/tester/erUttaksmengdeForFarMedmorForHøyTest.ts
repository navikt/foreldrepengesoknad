import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { StønadskontoUttak } from 'types/StønadskontoUttak';
import { beregnGjenståendeUttaksdager } from 'utils/uttaksPlanStatus';
import { Periode } from 'types/Periode';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { TilgjengeligStønadskonto } from '@navikt/fp-common';

const erUttaksmengdeForFarMedmorForHøy = (
    uttaksplan: Periode[],
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    farEllerMedmor: boolean,
): boolean => {
    if (farEllerMedmor === true) {
        const kontoUttak = beregnGjenståendeUttaksdager(tilgjengeligeStønadskontoer, uttaksplan, false);
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
