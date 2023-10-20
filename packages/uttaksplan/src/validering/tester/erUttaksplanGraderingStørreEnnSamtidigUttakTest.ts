import { Periode, getFloatFromString, isUttaksperiode } from '@navikt/fp-common';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

const uttaksplanGraderingStørreEnnSamtidigUttak = (uttaksplan: Periode[]) => {
    const result = uttaksplan
        .slice()
        .filter(
            (periode) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true && periode.gradert === true,
        )
        .filter(
            (periode) =>
                isUttaksperiode(periode) &&
                getFloatFromString(periode.stillingsprosent)! + getFloatFromString(periode.samtidigUttakProsent)! >
                    100.0,
        );

    return result.length > 0;
};

export const erUttaksplanGraderingStørreEnnSamtidigUttakTest: RegelTest = (
    grunnlag: Søknadsinfo,
): RegelTestresultat => {
    return { passerer: uttaksplanGraderingStørreEnnSamtidigUttak(grunnlag.perioder) === false };
};
