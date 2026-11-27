import { IntlShape } from 'react-intl';

import { formatDate, getCountryName, isISODateString } from '@navikt/fp-utils';

const lagPeriodetekst = (intl: IntlShape, fom?: string, tom?: string) => {
    if (isISODateString(fom) && isISODateString(tom)) {
        return intl.formatMessage(
            { id: 'slettKnapp.kontekst.periode' },
            { fom: formatDate(fom), tom: formatDate(tom) },
        );
    }
    if (isISODateString(fom)) {
        return intl.formatMessage({ id: 'slettKnapp.kontekst.fraDato' }, { fom: formatDate(fom) });
    }
    return null;
};

export const lagSlettKnappKontekst = (
    intl: IntlShape,
    { land, fom, tom }: { land?: string; fom?: string; tom?: string },
) => {
    const deler = [land ? getCountryName(land, intl.locale) : undefined, lagPeriodetekst(intl, fom, tom)].filter(
        Boolean,
    );
    return deler.length > 0 ? deler.join(', ') : undefined;
};
