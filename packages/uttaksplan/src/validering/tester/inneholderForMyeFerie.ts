import { IntlShape } from 'react-intl';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import {
    Perioden,
    UtsettelseÅrsakType,
    getVarighetString,
    isUtsettelsesperiode,
    uttaksConstants,
} from '@navikt/fp-common';

export const inneholderForMyeFerie: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const ferieUtsettelser = grunnlag.perioder.filter(
        (p) => isUtsettelsesperiode(p) && p.årsak === UtsettelseÅrsakType.Ferie,
    );
    const ferieDager = ferieUtsettelser.reduce(
        (sumFerieDager, periode) => sumFerieDager + Perioden(periode).getAntallUttaksdager(),
        0,
    );

    return {
        passerer: ferieDager <= uttaksConstants.MAKS_FERIEDAGER_MED_OVERFØRING,
        info: ferieUtsettelser.map((periode) => ({
            periodeId: periode.id,
            values: {
                ukerOgDager: (intl: IntlShape) => getVarighetString(ferieDager, intl),
            },
        })),
    };
};
