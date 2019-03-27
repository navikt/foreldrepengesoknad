import { Periode, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';

export const uttaksplanGraderingStørreEnnSamtidigUttak = (uttaksplan: Periode[]) => {
    const result = uttaksplan
        .slice()
        .filter(
            (periode) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true && periode.gradert === true
        )
        .filter(
            (periode) =>
                isUttaksperiode(periode) &&
                periode.stillingsprosent! + periode.samtidigUttakProsent! >
                100
        );

    return result.length > 0;
};
