import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { isOverskrivbarPeriode, isUtsettelsesperiode } from 'uttaksplan/types/Periode';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { formaterDato } from 'app/utils/dateUtils';

export function inneholderBareUtsettelserTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const ikkeOverskrivbarePerioder = grunnlag.perioder.filter((p) => !isOverskrivbarPeriode(p));
    const inneholderAndrePerioderEnnUtsettelser = ikkeOverskrivbarePerioder.some((p) => !isUtsettelsesperiode(p));
    const bareUtsettelser = !inneholderAndrePerioderEnnUtsettelser;
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
