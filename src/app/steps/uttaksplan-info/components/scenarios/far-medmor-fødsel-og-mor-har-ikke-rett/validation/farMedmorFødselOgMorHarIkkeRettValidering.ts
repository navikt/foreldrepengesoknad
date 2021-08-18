import { intlUtils } from '@navikt/fp-common';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import { Uttaksdagen } from '../../../../utils/Uttaksdagen';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';

export const validateStartdatoFarMedmor = (intl: IntlShape) => (permisjonStartdato: string) => {
    if (!isISODateString(permisjonStartdato)) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
    }
    if (!Uttaksdagen(ISOStringToDate(permisjonStartdato)!).erUttaksdag()) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
    }

    return undefined;
};
