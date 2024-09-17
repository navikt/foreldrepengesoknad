import { IntlShape } from 'react-intl';

import { FamiliehendelseType } from '@navikt/fp-common';

export const getFamiliehendelseType = (
    fødselsdato: string | undefined,
    termindato: string | undefined,
    omsorgsovertagelsesdato: string | undefined,
) => {
    if (omsorgsovertagelsesdato !== undefined) {
        return FamiliehendelseType.ADOPSJON;
    } else if (fødselsdato !== undefined) {
        return FamiliehendelseType.FØDSEL;
    } else if (termindato !== undefined) {
        return FamiliehendelseType.TERM;
    } else {
        throw new Error('Fødselsdato/ termindato/ omsorgsovertakelsedato mangler');
    }
};

export const getFamiliehendelseNavn = (erAdopsjon: boolean, erBarnetFødt: boolean, intl: IntlShape) => {
    if (erAdopsjon) {
        return intl.formatMessage({ id: 'adopsjon' });
    }
    if (erBarnetFødt) {
        return intl.formatMessage({ id: 'fødsel' });
    }
    return intl.formatMessage({ id: 'termin' });
};
