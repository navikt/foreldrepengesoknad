import { FamiliehendelseType } from 'app/types/FamiliehendelseType';

export const getFamiliehendelseType = (
    fødselsdato: string | undefined,
    termindato: string | undefined,
    omsorgsovertagelsesdato: string | undefined
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
