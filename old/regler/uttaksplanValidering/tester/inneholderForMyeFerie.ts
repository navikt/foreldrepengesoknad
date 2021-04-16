import { RegelTest, RegelTestresultat } from 'shared/types';
import { UttaksplanRegelgrunnlag } from '../types';
import { isUtsettelsesperiode, UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import { Perioden } from 'app/util/uttaksplan/Perioden';
import uttaksConstants from 'app/constants';
import { IntlShape } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';

export const inneholderForMyeFerie: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const ferieUtsettelser = grunnlag.perioder.filter(
        (p) => isUtsettelsesperiode(p) && p.årsak === UtsettelseÅrsakType.Ferie
    );
    const ferieDager = ferieUtsettelser.reduce(
        (sumFerieDager, periode) => sumFerieDager + Perioden(periode).getAntallUttaksdager(),
        0
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
