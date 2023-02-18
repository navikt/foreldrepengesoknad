import { hasValue } from '@navikt/fp-common';
import { isUtsettelsesperiode } from 'uttaksplan/types/Periode';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';

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
