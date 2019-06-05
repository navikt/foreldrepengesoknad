import { Periodetype, Periode } from '../../../types/uttaksplan/periodetyper';
import { getStillingsprosentRegler } from '../stillingsprosent';

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
