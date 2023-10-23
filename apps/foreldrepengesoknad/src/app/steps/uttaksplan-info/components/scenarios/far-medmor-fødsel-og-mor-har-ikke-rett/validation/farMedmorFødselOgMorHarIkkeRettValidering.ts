import { ISOStringToDate, Uttaksdagen, formatDateExtended, intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { isISODateString } from '@navikt/ds-datepicker';

export const validateStartdatoFarMedmor =
    (intl: IntlShape, minDato: Date, maxDato: Date) => (permisjonStartdato: string) => {
        if (!isISODateString(permisjonStartdato)) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
        }
        if (!Uttaksdagen(ISOStringToDate(permisjonStartdato)!).erUttaksdag()) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
        }
        if (dayjs(permisjonStartdato).isBefore(minDato, 'd') || dayjs(permisjonStartdato).isAfter(maxDato, 'd')) {
            return intlUtils(intl, 'valideringsfeil.dateOutsideRange.fom', {
                fom: formatDateExtended(minDato),
                tom: formatDateExtended(maxDato),
            });
        }

        return undefined;
    };
