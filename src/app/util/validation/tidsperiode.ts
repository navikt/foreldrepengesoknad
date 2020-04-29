import { IntlShape } from 'react-intl';
import { DateValue } from '../../types/common';
import { Validator } from 'common/lib/validation/types';
import { dateIsSameOrAfterRule, dateIsSameOrBeforeRule, hasValueRule } from './common';

import getMessage from 'common/util/i18nUtils';
import { DatoValidatorer } from '../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import { Tidsperiode } from 'common/types';

export const getFomTidsperiodeRegler = (fom: DateValue, tom: DateValue, intl: IntlShape): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        hasValueRule(fom, getMessage(intl, 'påkrevd')),
        dateIsSameOrBeforeRule(fom, tom, getMessage(intl, `${intlKey}.førTilDato`)),
    ];
};

export const getTomTidsperiodeRegler = (
    tom: DateValue,
    fom: DateValue,
    intl: IntlShape,
    visPågåendePeriodeCheckbox?: boolean,
    pågående?: boolean
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return visPågåendePeriodeCheckbox
        ? [
              {
                  test: () => tom !== undefined || pågående === true,
                  failText: getMessage(intl, 'påkrevdHvisIkkePågående'),
              },
          ]
        : [
              hasValueRule(tom, getMessage(intl, 'påkrevd')),
              dateIsSameOrAfterRule(tom, fom, getMessage(intl, `${intlKey}.etterFraDato`)),
          ];
};

export const getTidsperiodeRegler = (
    tidsperiode: Partial<Tidsperiode>,
    intl: IntlShape,
    visPågåendePeriodeCheckbox?: boolean,
    pågående?: boolean
): DatoValidatorer => ({
    fra: getFomTidsperiodeRegler(tidsperiode.fom, tidsperiode.tom, intl),
    til: getTomTidsperiodeRegler(tidsperiode.tom, tidsperiode.fom, intl, visPågåendePeriodeCheckbox, pågående),
});
