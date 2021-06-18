import { intlUtils } from '@navikt/fp-common';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import { Uttaksdagen } from '../utils/Uttaksdagen';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { uttaksplanDatoavgrensninger } from '../utils/uttaksplanDatoavgrensninger';
import dayjs from 'dayjs';
import uttaksConstants from 'app/constants';

export const validateErStartdatoFørTermindato =
    (intl: IntlShape, familiehendelsedato: Date, skalIkkeHaUttakFørTermin: boolean) => (datoForAleneomsorg: string) => {
        if (!isISODateString(skalIkkeHaUttakFørTermin)) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
        }

        if (datoForAleneomsorg === undefined || skalIkkeHaUttakFørTermin !== true) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoFørTermin');
        }

        if (datoForAleneomsorg === undefined || Uttaksdagen(ISOStringToDate(datoForAleneomsorg)!).erUttaksdag()) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
        }

        if (skalIkkeHaUttakFørTermin !== true) {
            const avgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsedato);

            if (
                avgrensninger.minDate &&
                avgrensninger.maxDate &&
                dayjs(datoForAleneomsorg).isSameOrAfter(avgrensninger.minDate, 'day') &&
                dayjs(datoForAleneomsorg).isSameOrBefore(avgrensninger.maxDate, 'day')
            ) {
                return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoUtenforGyldigTidsrom', {
                    uker: uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL,
                });
            }
        }

        return undefined;
    };
