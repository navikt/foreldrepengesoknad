import { Regelgrunnlag, RegelTestresultat } from '../types';
import { erSentGradertUttak } from '../../../util/uttaksplan/uttakUtils';

export function inneholderSeneGraderteUttakTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const seneGraderteUttak = grunnlag.perioder.filter(erSentGradertUttak);
    const passerer = seneGraderteUttak.length === 0;
    return {
        passerer,
        info: seneGraderteUttak.map((periode) => ({
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUttak',
            periodeId: periode.id
        }))
    };
}
