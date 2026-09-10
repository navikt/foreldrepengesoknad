import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

export const getForhåndsutfyltOppstart = (
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[],
): string | undefined => {
    const datoer = frilansoppdrag
        .map(({ fom }) => dayjs(fom))
        .filter((dato) => dato.isValid())
        .sort((a, b) => a.valueOf() - b.valueOf());

    return datoer[0]?.format(ISO_DATE_FORMAT);
};
