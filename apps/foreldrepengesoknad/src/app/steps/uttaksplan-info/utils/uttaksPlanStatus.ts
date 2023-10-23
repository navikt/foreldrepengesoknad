import { Periode, Perioden, getFloatFromString, isUttaksperiode } from '@navikt/fp-common';

export const finnAntallDagerÅTrekke = (periode: Periode): number => {
    const dager = Perioden(periode).getAntallUttaksdager();
    if (isUttaksperiode(periode)) {
        const periodeErGradert = periode.stillingsprosent !== undefined;
        const periodeErSamtidigUttak = periode.samtidigUttakProsent !== undefined;

        if ((periodeErGradert && periodeErSamtidigUttak) || periodeErGradert) {
            const graderingsProsent = (100 - getFloatFromString(periode.stillingsprosent)!) / 100;

            return dager * graderingsProsent;
        } else if (periodeErSamtidigUttak) {
            return dager * (getFloatFromString(periode.samtidigUttakProsent)! / 100);
        } else {
            return dager;
        }
    }
    return dager;
};
