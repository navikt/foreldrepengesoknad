import { isUttaksperiode } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from 'validering/utils/types/regelTypes';
import { Søknadsinfo } from 'validering/utils/types/Søknadsinfo';

export const harUttaksperiodeStønadskonto: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const uttaksperioderUtenStønadskonto = grunnlag.perioder.filter(
        (periode) => isUttaksperiode(periode) && periode.konto === undefined,
    );
    return {
        passerer: uttaksperioderUtenStønadskonto.length === 0,
        info: uttaksperioderUtenStønadskonto.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
