import { IntlShape } from 'react-intl';
import { Validator } from 'common/lib/validation/types';
import { dateIsSameOrAfterRule, dateIsSameOrBeforeRule, erGyldigDato, hasValueRule } from './common';

import getMessage from 'common/util/i18nUtils';
import { DatoValidatorer } from '../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import { TidsperiodeStringMedValgfriSluttdato } from 'common/types';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

export const getFomTidsperiodeRegler = (
    fom: string | undefined,
    tom: string | undefined,
    intl: IntlShape
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        hasValueRule(fom, getMessage(intl, 'valideringsfeil.fraOgMedDato.påkrevd')),
        erGyldigDato(fom, getMessage(intl, 'valideringsfeil.fraOgMedDato.gyldigDato')),
        dateIsSameOrBeforeRule(ISOStringToDate(fom), ISOStringToDate(tom), getMessage(intl, `${intlKey}.førTilDato`)),
    ];
};

export const getTomTidsperiodeRegler = (
    tom: string | undefined,
    fom: string | undefined,
    intl: IntlShape,
    visPågåendePeriodeCheckbox?: boolean,
    pågående?: boolean
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const erPågående = pågående === true;

    return visPågåendePeriodeCheckbox
        ? [
              {
                  test: () => tom !== undefined || erPågående,
                  failText: getMessage(intl, 'påkrevdHvisIkkePågående'),
              },
              erGyldigDato(tom, getMessage(intl, 'valideringsfeil.tilOgMedDato.gyldigDato'), erPågående),
          ]
        : [
              hasValueRule(tom, getMessage(intl, 'påkrevd')),
              erGyldigDato(tom, getMessage(intl, 'valideringsfeil.tilOgMedDato.gyldigDato')),
              dateIsSameOrAfterRule(
                  ISOStringToDate(tom),
                  ISOStringToDate(fom),
                  getMessage(intl, `${intlKey}.etterFraDato`)
              ),
          ];
};

export const getTidsperiodeRegler = (
    tidsperiode: Partial<TidsperiodeStringMedValgfriSluttdato>,
    intl: IntlShape,
    visPågåendePeriodeCheckbox?: boolean,
    pågående?: boolean
): DatoValidatorer => ({
    fra: getFomTidsperiodeRegler(tidsperiode.fom, tidsperiode.tom, intl),
    til: getTomTidsperiodeRegler(tidsperiode.tom, tidsperiode.fom, intl, visPågåendePeriodeCheckbox, pågående),
});
