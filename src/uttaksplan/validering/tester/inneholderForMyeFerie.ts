import { RegelTest, RegelTestresultat } from 'shared/types';
import uttaksConstants from 'app/constants';
import { IntlShape } from 'react-intl';
import { Perioden } from 'app/steps/uttaksplan-info/utils/Perioden';
import { isUtsettelsesperiode } from 'uttaksplan/types/Periode';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { getVarighetString } from 'app/utils/dateUtils';

export const inneholderForMyeFerie: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
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
