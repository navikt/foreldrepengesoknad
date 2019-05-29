import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import moment from 'moment';
import { isUtsettelsesperiode } from 'app/types/uttaksplan/periodetyper';

export const erUtsettelseEtterFamiliehendelsesdato: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const { familiehendelsesdato } = grunnlag.søknadsinfo.søknaden;
    const ugyldigeUtsettelser = grunnlag.perioder
        .filter(isUtsettelsesperiode)
        .filter((utsettelse) => moment(utsettelse.tidsperiode.fom).isBefore(familiehendelsesdato));
    return {
        passerer: ugyldigeUtsettelser.length === 0,
        info: ugyldigeUtsettelser.map((periode) => ({
            periodeId: periode.id
        }))
    };
};
