import { IntlShape } from 'react-intl';

import { formatDate, hasValue, intlUtils } from '@navikt/fp-common';
import { isISODateString } from '@navikt/fp-utils';

import { isDateABeforeDateB } from 'app/utils/dateUtils';

export const validateStartdatoUttakFarMedmorAleneomsorgFødsel =
    (intl: IntlShape, familiehendelsesdato: string) => (startdatoUttak: string) => {
        if (!hasValue(startdatoUttak)) {
            return intlUtils(intl, 'valideringsfeil.uttaksplaninfo.farMedmorAleneomsorgFødsel.startdatoUttak.påkrevd');
        }

        if (!isISODateString(startdatoUttak)) {
            return intlUtils(
                intl,
                'valideringsfeil.uttaksplaninfo.farMedmorAleneomsorgFødsel.startdatoUttak.gyldigDato',
            );
        }

        if (isDateABeforeDateB(startdatoUttak, familiehendelsesdato)) {
            return intlUtils(
                intl,
                'valideringsfeil.uttaksplaninfo.farMedmorAleneomsorgFødsel.startdatoUttak.etterFamiliehendelsesdato',
                { familiehendelsesdato: formatDate(familiehendelsesdato) },
            );
        }

        return undefined;
    };
