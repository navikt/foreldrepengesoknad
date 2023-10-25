import dayjs from 'dayjs';
import { Søknadsinfo, isUtsettelsesperiode } from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../../utils/types/regelTypes';

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
