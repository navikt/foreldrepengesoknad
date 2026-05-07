import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

dayjs.extend(minMax);

export const TEXT_INPUT_MIN_LENGTH = 10;
export const TEXT_INPUT_MAX_LENGTH = 1000;

export const getMinInputTilOgMedValue = (fom: string | undefined, otherMinDate: string) => {
    if (fom) {
        return dayjs.max([dayjs(otherMinDate), dayjs(fom)]).format(ISO_DATE_FORMAT);
    }
    return otherMinDate;
};

export const getSlutteTekst = (sluttDatoArbeid: string, intl: IntlShape) => {
    return dayjs().isBefore(dayjs(sluttDatoArbeid), 'd')
        ? intl.formatMessage({ id: 'slutter' })
        : intl.formatMessage({ id: 'sluttet' });
};
