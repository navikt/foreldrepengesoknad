import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { isValidTidsperiode } from '../../../util/uttaksplan/Tidsperioden';
import { førsteOktober2021ReglerGjelder } from 'app/util/dates/dates';

export const inneholderUttaksplanPerioderTest: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const { søknadsinfo } = grunnlag;
    const { søknaden } = søknadsinfo;
    const { familiehendelsesdato, erEndringssøknad } = søknaden;

    if (førsteOktober2021ReglerGjelder(familiehendelsesdato) && erEndringssøknad) {
        return {
            passerer: true,
        };
    }

    return { passerer: grunnlag.perioder.filter((periode) => isValidTidsperiode(periode.tidsperiode)).length > 0 };
};
