import { intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { isISODateString } from 'nav-datovelger';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import uttaksConstants from 'app/constants';
import { Uttaksdagen } from '../../../../utils/Uttaksdagen';
import { uttaksplanDatoavgrensninger } from '../../../../utils/uttaksplanDatoavgrensninger';

export const validateErStartdatoFørTermindato =
    (intl: IntlShape, familiehendelsedato: Date, skalIkkeHaUttakFørTermin: boolean) => (permisjonStartdato: string) => {
        if (!(permisjonStartdato === undefined && skalIkkeHaUttakFørTermin)) {
            if (!isISODateString(permisjonStartdato)) {
                return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
            }
        }

        if (permisjonStartdato !== undefined && skalIkkeHaUttakFørTermin) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoFørTermin');
        }

        if (permisjonStartdato !== undefined && !Uttaksdagen(ISOStringToDate(permisjonStartdato)!).erUttaksdag()) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
        }

        if (!skalIkkeHaUttakFørTermin) {
            const avgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(dateToISOString(familiehendelsedato));
            if (
                (avgrensninger.minDate &&
                    avgrensninger.maxDate &&
                    dayjs(permisjonStartdato).isBefore(avgrensninger.minDate, 'day')) ||
                dayjs(permisjonStartdato).isAfter(avgrensninger.maxDate, 'day')
            ) {
                return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoUtenforGyldigTidsrom', {
                    uker: uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
                });
            }
        }

        return undefined;
    };
