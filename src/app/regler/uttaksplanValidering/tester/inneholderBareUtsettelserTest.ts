import { Regelgrunnlag, RegelTestresultat } from '../types';
import { isUtsettelsesperiode } from '../../../types/uttaksplan/periodetyper';
import { formaterDato } from 'common/util/datoUtils';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';

export function inneholderBareUtsettelserTest(grunnlag: Regelgrunnlag): RegelTestresultat {
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
                )
            }
        }
    };
}
