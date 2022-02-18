import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat } from 'shared/regler/regelTypes';
import { isUtsettelsesperiode } from 'uttaksplan/types/Periode';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { formaterDato } from 'app/utils/dateUtils';

export function inneholderBareUtsettelserTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const bareUtsettelser = !grunnlag.perioder.some((p) => !isUtsettelsesperiode(p)) && grunnlag.perioder.length > 0;
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
                    'D. MMMM YYYY'
                ),
            },
        },
    };
}
