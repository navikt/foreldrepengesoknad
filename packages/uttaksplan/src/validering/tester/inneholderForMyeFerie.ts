import { IntlShape } from 'react-intl';

import { Perioden, Søknadsinfo, UtsettelseÅrsakType, getVarighetString, isUtsettelsesperiode } from '@navikt/fp-common';

import uttaksConstants from '../../common/uttaksConstants';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';

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
