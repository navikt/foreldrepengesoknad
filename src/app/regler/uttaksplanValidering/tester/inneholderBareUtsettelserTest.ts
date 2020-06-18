import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';

import { isUtsettelsesperiode } from '../../../types/uttaksplan/periodetyper';
import { formaterDato } from 'common/util/datoUtils';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';

export function inneholderBareUtsettelserTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const bareUtsettelser = !grunnlag.perioder.some((p) => !isUtsettelsesperiode(p)) && grunnlag.perioder.length > 0;
    const passerer = bareUtsettelser === false;
    const intlKey = grunnlag.søknadsinfo.søknaden.erEndringssøknad
        ? 'uttaksplan.veileder.planenInneholderKunUtsettelser.endringssøknad'
        : 'uttaksplan.veileder.planenInneholderKunUtsettelser';

    return {
        passerer,
        info: {
            intlKey,
            values: {
                sisteDag: formaterDato(
                    Uttaksdagen(Periodene(grunnlag.perioder).getFørsteUttaksdagEtterSistePeriode()!).forrige(),
                    'D. MMMM YYYY'
                ),
            },
        },
    };
}
