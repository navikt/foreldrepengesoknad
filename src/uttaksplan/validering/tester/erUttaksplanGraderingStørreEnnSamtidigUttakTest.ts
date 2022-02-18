import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { getFloatFromString } from 'app/utils/numberUtils';

const uttaksplanGraderingStørreEnnSamtidigUttak = (uttaksplan: Periode[]) => {
    const result = uttaksplan
        .slice()
        .filter(
            (periode) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true && periode.gradert === true
        )
        .filter(
            (periode) =>
                isUttaksperiode(periode) &&
                getFloatFromString(periode.stillingsprosent)! + getFloatFromString(periode.samtidigUttakProsent)! >
                    100.0
        );

    return result.length > 0;
};

export const erUttaksplanGraderingStørreEnnSamtidigUttakTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    return { passerer: uttaksplanGraderingStørreEnnSamtidigUttak(grunnlag.perioder) === false };
};
