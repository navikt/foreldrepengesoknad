import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { getStillingsprosentRegler } from './stillingsprosentValideringUtils';

export const gradertUttaksperiodeErUgyldig = (periode: Periode) => {
    if (periode.type === Periodetype.Uttak) {
        const { gradert, stillingsprosent } = periode;
        if (gradert === true) {
            const regler = getStillingsprosentRegler(false, stillingsprosent || '');
            const results = regler.map((regel) => regel.test() === true);
            return results.some((erGyldig) => erGyldig === false);
        }
    }
    return false;
};

export const samtidigUttaksperiodeErUgyldig = (periode: Periode, søkerErFarEllerMedmor: boolean) => {
    if (periode.type === Periodetype.Uttak) {
        const { ønskerSamtidigUttak, samtidigUttakProsent } = periode;
        if (ønskerSamtidigUttak === true && søkerErFarEllerMedmor) {
            const regler = getStillingsprosentRegler(true, samtidigUttakProsent || '');
            const results = regler.map((regel) => regel.test() === true);
            return results.some((erGyldig) => erGyldig === false);
        }
    }
    return false;
};
