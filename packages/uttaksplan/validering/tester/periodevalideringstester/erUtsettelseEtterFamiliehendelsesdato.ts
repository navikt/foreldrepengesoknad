import dayjs from 'dayjs';
import { isUtsettelsesperiode } from 'uttaksplan/types/Periode';
import { RegelTest, RegelTestresultat } from 'uttaksplan/validering/utils/types/regelTypes';
import { Søknadsinfo } from '../../utils/types/Søknadsinfo';

export const erUtsettelseEtterFamiliehendelsesdato: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ugyldigeUtsettelser = grunnlag.perioder
        .filter(isUtsettelsesperiode)
        .filter((utsettelse) => dayjs(utsettelse.tidsperiode.fom).isBefore(grunnlag.familiehendelsesdato, 'day'));
    return {
        passerer: ugyldigeUtsettelser.length === 0,
        info: ugyldigeUtsettelser.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
