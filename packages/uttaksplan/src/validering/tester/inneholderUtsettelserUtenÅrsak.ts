import { Søknadsinfo, isUtsettelsesperiode } from '@navikt/fp-common';

import { RegelTestresultat } from '../utils/types/regelTypes';

const hasValue = (v: string | undefined | null) => v !== '' && v !== undefined && v !== null;

export const inneholderUtsettelserUtenÅrsak = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const utsettelserUtenÅrsak = grunnlag.perioder.filter((p) => isUtsettelsesperiode(p) && !hasValue(p.årsak));

    const passerer = utsettelserUtenÅrsak.length === 0;

    return {
        passerer,
        info: utsettelserUtenÅrsak.map((periode) => ({
            intlKey: 'uttaksplan.validering.feil.inneholderUtsettelserUtenÅrsak',
            periodeId: periode.id,
        })),
    };
};
