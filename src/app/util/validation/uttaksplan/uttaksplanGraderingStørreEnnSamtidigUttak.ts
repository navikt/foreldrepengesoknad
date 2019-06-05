import { Periode, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { getFloatFromString } from 'common/util/numberUtils';

export const uttaksplanGraderingStørreEnnSamtidigUttak = (uttaksplan: Periode[]) => {
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
