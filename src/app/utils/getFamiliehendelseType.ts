import { FamiliehendelseType } from 'app/types/FamiliehendelseType';

export const getFamiliehendelseType = (fødselsdato: string | undefined, termindato: string | undefined) => {
    if (fødselsdato !== undefined) {
        return FamiliehendelseType.FØDSEL;
    } else {
        return termindato !== undefined ? FamiliehendelseType.TERM : FamiliehendelseType.ADOPSJON;
    }
};
