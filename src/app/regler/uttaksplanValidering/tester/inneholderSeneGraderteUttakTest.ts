import { Regelgrunnlag, RegelTestresultat } from '../types';
import { erSentGradertUttak } from '../../../util/uttaksplan/uttakUtils';

export function inneholderSeneGraderteUttakTest(grunnlag: Regelgrunnlag): RegelTestresultat {
    const inneholderSentGradertUttak = grunnlag.perioder.filter(erSentGradertUttak).length > 0;
    const passerer = inneholderSentGradertUttak === false;
    return {
        passerer,
        info: {
            intlKey: 'uttaksplan.veileder.planenAdvarerOmUttak'
        }
    };
}
