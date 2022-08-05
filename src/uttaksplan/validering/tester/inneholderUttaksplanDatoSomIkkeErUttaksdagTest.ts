import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';
import { isInfoPeriode } from 'uttaksplan/types/Periode';
import { erUttaksdag } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

export const inneholderUttaksplanDatoSomIkkeErUttaksdag: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder
        .filter((p) => !isInfoPeriode(p))
        .filter(({ tidsperiode: { fom, tom } }) => erUttaksdag(fom) === false || erUttaksdag(tom) === false);

    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode): RegelTestresultatInfo => {
            return {
                intlKey: `uttaksplan.validering.feil.${
                    erUttaksdag(periode.tidsperiode.fom)
                        ? 'periodeSlutterPåDatoSomIkkeErUttaksdag'
                        : 'periodeStarterPåDatoSomIkkeErUttaksdag'
                }`,
                periodeId: periode.id,
            };
        }),
    };
};
