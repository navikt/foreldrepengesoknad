import { Søknadsinfo, hasValue, isUtsettelsesperiode } from '@navikt/fp-common';
import { RegelTestresultat } from '../utils/types/regelTypes';

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
