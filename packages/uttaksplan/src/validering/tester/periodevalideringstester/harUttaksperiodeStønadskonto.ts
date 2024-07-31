import { Søknadsinfo, isUttaksperiode } from '@navikt/fp-common';

import { RegelTest, RegelTestresultat } from '../../utils/types/regelTypes';

export const harUttaksperiodeStønadskonto: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const uttaksperioderUtenStønadskonto = grunnlag.perioder.filter(
        (periode) => isUttaksperiode(periode) && periode.konto == undefined,
    );
    return {
        passerer: uttaksperioderUtenStønadskonto.length === 0,
        info: uttaksperioderUtenStønadskonto.map((periode) => ({
            // @ts-ignore FIX! Konto er eigentleg optional her.
            periodeId: periode.id,
        })),
    };
};
