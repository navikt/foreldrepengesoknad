import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';
import { isUttaksperiode } from 'uttaksplan/types/Periode';
import { Søknadsinfo } from 'uttaksplan/validering/utils/types/Søknadsinfo';

export const harUttaksperiodeStønadskonto: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const uttaksperioderUtenStønadskonto = grunnlag.perioder.filter(
        (periode) => isUttaksperiode(periode) && periode.konto === undefined
    );
    return {
        passerer: uttaksperioderUtenStønadskonto.length === 0,
        info: uttaksperioderUtenStønadskonto.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
