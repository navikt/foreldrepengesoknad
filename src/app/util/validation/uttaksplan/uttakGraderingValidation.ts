import { UttakFormPeriodeType } from '../../../components/uttak-form/UttakForm';
import { Periodetype } from '../../../types/uttaksplan/periodetyper';
import { getStillingsprosentRegler } from '../stillingsprosent';

export const gradertUttaksperiodeErUgyldig = (periode: UttakFormPeriodeType) => {
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
