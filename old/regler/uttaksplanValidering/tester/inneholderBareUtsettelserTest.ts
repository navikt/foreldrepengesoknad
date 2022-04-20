import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat } from 'shared/regler/regelTypes';

import { isUtsettelsesperiode, Periodetype, UtsettelseÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { formaterDato } from 'common/util/datoUtils';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';

export function inneholderBareUtsettelserTest(grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat {
    const perioderUtenFriUtsettelse = grunnlag.perioder.filter(
        (p) => !(p.type === Periodetype.Utsettelse && p.årsak === UtsettelseÅrsakType.Fri)
    );
    const bareUtsettelser =
        !perioderUtenFriUtsettelse.some((p) => !isUtsettelsesperiode(p)) && perioderUtenFriUtsettelse.length > 0;
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
