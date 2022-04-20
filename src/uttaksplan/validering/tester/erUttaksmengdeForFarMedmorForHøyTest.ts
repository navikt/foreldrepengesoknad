import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { beregnGjenståendeUttaksdager } from 'uttaksplan/utils/uttaksPlanStatus';
import { Periode } from 'uttaksplan/types/Periode';

const erUttaksmengdeForFarMedmorForHøy = (
    uttaksplan: Periode[],
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    farEllerMedmor: boolean
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
                grunnlag.søkerErFarEllerMedmor
            ) === false,
    };
};
