import dayjs from 'dayjs';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';
import { isUtsettelsesperiode } from 'uttaksplan/types/Periode';
import { Søknadsinfo } from '../../utils/types/Søknadsinfo';

export const erUtsettelseEtterFamiliehendelsesdato: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ugyldigeUtsettelser = grunnlag.perioder
        .filter(isUtsettelsesperiode)
        .filter((utsettelse) => dayjs(utsettelse.tidsperiode.fom).isBefore(grunnlag.familiehendelsesdato));
    return {
        passerer: ugyldigeUtsettelser.length === 0,
        info: ugyldigeUtsettelser.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
