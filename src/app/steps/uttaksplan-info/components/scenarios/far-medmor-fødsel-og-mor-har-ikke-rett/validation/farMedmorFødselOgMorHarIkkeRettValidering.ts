import { intlUtils } from '@navikt/fp-common';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import { Uttaksdagen } from '../../../../utils/Uttaksdagen';

export const validateStartdatoFarMedmor = (intl: IntlShape) => (permisjonStartdato: string) => {
    if (!isISODateString(permisjonStartdato)) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
    }
    if (!Uttaksdagen(ISOStringToDate(permisjonStartdato)!).erUttaksdag()) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
    }

    return undefined;
};
