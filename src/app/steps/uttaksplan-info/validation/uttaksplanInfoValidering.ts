import { intlUtils } from '@navikt/fp-common';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import { Uttaksdagen } from '../utils/Uttaksdagen';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { uttaksplanDatoavgrensninger } from '../utils/uttaksplanDatoavgrensninger';
import dayjs from 'dayjs';
import uttaksConstants from 'app/constants';

export const validateErStartdatoFørTermindato =
    (intl: IntlShape, familiehendelsedato: Date, skalIkkeHaUttakFørTermin: boolean) => (permisjonStartdato: string) => {
        if (!isISODateString(permisjonStartdato)) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
        }

        if (permisjonStartdato === undefined || skalIkkeHaUttakFørTermin !== true) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoFørTermin');
        }

        if (permisjonStartdato === undefined || Uttaksdagen(ISOStringToDate(permisjonStartdato)!).erUttaksdag()) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
        }

        if (skalIkkeHaUttakFørTermin !== true) {
            const avgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(dateToISOString(familiehendelsedato));

            if (
                avgrensninger.minDate &&
                avgrensninger.maxDate &&
                dayjs(permisjonStartdato).isSameOrAfter(avgrensninger.minDate, 'day') &&
                dayjs(permisjonStartdato).isSameOrBefore(avgrensninger.maxDate, 'day')
            ) {
                return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoUtenforGyldigTidsrom', {
                    uker: uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
                });
            }
        }

        return undefined;
    };

export const validateErAnnenStartdatoAdopsjonGyldig = (intl: IntlShape) => (annenStartdatoAdopsjon: string) => {
    if (!isISODateString(annenStartdatoAdopsjon)) {
        return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoAdopsjon.annenDato.gyldigDato');
    }

    return undefined;
};
