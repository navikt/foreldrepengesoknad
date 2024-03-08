import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { isISODateString } from '@navikt/ds-datepicker';

import {
    ISOStringToDate,
    Uttaksdagen,
    intlUtils,
    uttaksConstants,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';

export const validateErStartdatoFørTermindato =
    (intl: IntlShape, familiehendelsedato: Date, skalIkkeHaUttakFørTermin: boolean, termindato: string | undefined) =>
    (permisjonStartdato: string) => {
        if (!(permisjonStartdato === undefined && skalIkkeHaUttakFørTermin)) {
            if (!isISODateString(permisjonStartdato)) {
                return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoPermisjon.gyldigDato');
            }
        }

        if (permisjonStartdato !== undefined && !Uttaksdagen(ISOStringToDate(permisjonStartdato)!).erUttaksdag()) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.startdatoHelg');
        }

        if (!skalIkkeHaUttakFørTermin) {
            const avgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(
                familiehendelsedato,
                termindato ? dayjs(termindato).toDate() : undefined,
            );
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
