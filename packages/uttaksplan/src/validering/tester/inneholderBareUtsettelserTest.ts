import { Søknadsinfo, isOverskrivbarPeriode, isUtsettelsesperiode } from '@navikt/fp-common';
import { Uttaksdagen } from '@navikt/fp-utils';

import { Periodene } from '../../utils/Periodene';
import { formaterDato } from '../../utils/dateUtils';
import { RegelTestresultat } from '../utils/types/regelTypes';

export function inneholderBareUtsettelserTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const ikkeOverskrivbarePerioder = grunnlag.perioder.filter((p) => !isOverskrivbarPeriode(p));
    const inneholderAndrePerioderEnnUtsettelser = ikkeOverskrivbarePerioder.some((p) => !isUtsettelsesperiode(p));
    const finnesPerioderIPlanen = grunnlag.perioder.length > 0;
    const bareUtsettelser = !inneholderAndrePerioderEnnUtsettelser && finnesPerioderIPlanen;
    const passerer = bareUtsettelser === false;
    const intlKey = grunnlag.erEndringssøknad
        ? 'uttaksplan.veileder.planenInneholderKunUtsettelser.endringssøknad'
        : 'uttaksplan.veileder.planenInneholderKunUtsettelser';

    return {
        passerer,
        info: {
            intlKey,
            values: {
                sisteDag: formaterDato(
                    Uttaksdagen(Periodene(grunnlag.perioder).getFørsteUttaksdagEtterSistePeriode()!).forrige(),
                    'D. MMMM YYYY',
                ),
            },
        },
    };
}
