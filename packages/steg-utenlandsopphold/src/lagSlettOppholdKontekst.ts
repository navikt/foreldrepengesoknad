import { IntlShape } from 'react-intl';

import { formatDate, getCountryName, isISODateString } from '@navikt/fp-utils';

const lagPeriodetekst = (intl: IntlShape, fom?: string, tom?: string) => {
    if (isISODateString(fom) && isISODateString(tom)) {
        return intl.formatMessage(
            { id: 'UtenlandsoppholdPeriode.Slett.Periode' },
            { fom: formatDate(fom), tom: formatDate(tom) },
        );
    }
    if (isISODateString(fom)) {
        return intl.formatMessage({ id: 'UtenlandsoppholdPeriode.Slett.FraDato' }, { fom: formatDate(fom) });
    }
    return null;
};

export const lagSlettOppholdKontekst = (intl: IntlShape, landkode?: string, fom?: string, tom?: string) => {
    const deler = [
        landkode ? getCountryName(landkode, intl.locale) : undefined,
        lagPeriodetekst(intl, fom, tom),
    ].filter(Boolean);
    return deler.length > 0 ? deler.join(', ') : undefined;
};
