import { Søknadsinfo, erPeriodeInnvilget, erSentGradertUttak } from '@navikt/fp-common';
import { RegelTestresultat } from '../utils/types/regelTypes';

export function inneholderSeneGraderteUttakTest(grunnlag: Søknadsinfo): RegelTestresultat {
    const seneGraderteUttak = grunnlag.perioder
        .filter((p) => !erPeriodeInnvilget(p, grunnlag.eksisterendeSak))
        .filter(erSentGradertUttak);
    const passerer = seneGraderteUttak.length === 0;
    return {
        passerer,
        info: seneGraderteUttak.map((periode) => ({
            intlKey: 'uttaksplan.validering.advarsel.planenAdvarerOmUttak',
            periodeId: periode.id,
        })),
    };
}
