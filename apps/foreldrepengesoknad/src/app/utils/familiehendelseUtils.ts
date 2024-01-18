import { FamiliehendelseType, intlUtils } from '@navikt/fp-common';
import { IntlShape } from 'react-intl';

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
        return intlUtils(intl, 'adopsjon');
    }
    if (erBarnetFødt) {
        return intlUtils(intl, 'fødsel');
    }
    return intlUtils(intl, 'termin');
};
