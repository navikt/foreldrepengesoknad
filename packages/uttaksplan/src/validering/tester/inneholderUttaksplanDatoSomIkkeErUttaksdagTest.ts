import { Søknadsinfo, isInfoPeriode } from '@navikt/fp-common';
import { erUttaksdagOld } from '@navikt/fp-utils';

import { RegelTest, RegelTestresultat, RegelTestresultatInfo } from '../utils/types/regelTypes';

export const inneholderUttaksplanDatoSomIkkeErUttaksdag: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ugyldigePerioder = grunnlag.perioder
        .filter((p) => !isInfoPeriode(p))
        .filter(({ tidsperiode: { fom, tom } }) => erUttaksdagOld(fom) === false || erUttaksdagOld(tom) === false);

    return {
        passerer: ugyldigePerioder.length === 0,
        info: ugyldigePerioder.map((periode): RegelTestresultatInfo => {
            return {
                intlKey: `uttaksplan.validering.feil.${
                    erUttaksdagOld(periode.tidsperiode.fom)
                        ? 'periodeSlutterPåDatoSomIkkeErUttaksdag'
                        : 'periodeStarterPåDatoSomIkkeErUttaksdag'
                }`,
                periodeId: periode.id,
            };
        }),
    };
};
