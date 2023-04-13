import { intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import uttaksConstants from 'app/constants';
import { Uttaksdagen } from '../../../../utils/Uttaksdagen';
import { uttaksplanDatoavgrensninger } from '../../../../utils/uttaksplanDatoavgrensninger';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { isISODateString } from '@navikt/ds-datepicker';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

export const validateErStartdatoFørTermindato =
    (intl: IntlShape, familiehendelsedato: Date, skalIkkeHaUttakFørTermin: boolean) => (permisjonStartdato: string) => {
        if (!(permisjonStartdato === undefined && skalIkkeHaUttakFørTermin)) {
            if (!isISODateString(permisjonStartdato)) {
                return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
            }
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
