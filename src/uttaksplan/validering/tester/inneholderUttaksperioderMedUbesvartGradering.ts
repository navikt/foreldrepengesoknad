import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { isUttaksperiode, Periode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { graderingSkalBesvares } from 'uttaksplan/utils/uttaksskjema/graderingSkalBesvares';

export const inneholderUttaksperioderMedUbesvartGradering = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const uttaksperioder = grunnlag.perioder.filter((p: Periode) => isUttaksperiode(p)) as Uttaksperiode[];

    const perioderMedUbesvartGradering = uttaksperioder
        .filter((p) => graderingSkalBesvares(p.type, p.konto))
        .filter((p) => p.gradert === undefined);

    return {
        passerer: perioderMedUbesvartGradering.length === 0,
        info: perioderMedUbesvartGradering.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.inneholderUttaksperioderMedUbesvartGradering',
            periodeId: periode.id,
        })),
    };
};
