import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import moment from 'moment';
import { isUtsettelsesperiode } from 'app/types/uttaksplan/periodetyper';

export const erUtsettelseEtterFamiliehendelsesdato: RegelTest = (
    grunnlag: UttaksplanRegelgrunnlag
): RegelTestresultat => {
    const { familiehendelsesdato } = grunnlag.søknadsinfo.søknaden;
    const ugyldigeUtsettelser = grunnlag.perioder
        .filter(isUtsettelsesperiode)
        .filter((utsettelse) => moment(utsettelse.tidsperiode.fom).isBefore(familiehendelsesdato));
    return {
        passerer: ugyldigeUtsettelser.length === 0,
        info: ugyldigeUtsettelser.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
