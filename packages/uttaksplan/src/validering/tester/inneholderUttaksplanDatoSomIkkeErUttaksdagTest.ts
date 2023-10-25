import { Søknadsinfo, erUttaksdag, isInfoPeriode } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';

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
