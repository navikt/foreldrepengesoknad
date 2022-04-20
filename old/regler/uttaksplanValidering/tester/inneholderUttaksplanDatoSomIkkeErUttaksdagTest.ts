import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from 'shared/regler/regelTypes';
import { erUttaksdag } from '../../../util/uttaksplan/Uttaksdagen';
import { isInfoPeriode } from 'app/types/uttaksplan/periodetyper';

export const inneholderUttaksplanDatoSomIkkeErUttaksdag: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder
        .filter((p) => !isInfoPeriode(p))
        .filter(({ tidsperiode: { fom, tom } }) => erUttaksdag(fom) === false || erUttaksdag(tom) === false);

    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map(
            (periode): RegelTestresultatInfo => {
                return {
                    intlKey: `uttaksplan.validering.feil.${
                        erUttaksdag(periode.tidsperiode.fom)
                            ? 'periodeSlutterPåDatoSomIkkeErUttaksdag'
                            : 'periodeStarterPåDatoSomIkkeErUttaksdag'
                    }`,
                    periodeId: periode.id,
                };
            }
        ),
    };
};
