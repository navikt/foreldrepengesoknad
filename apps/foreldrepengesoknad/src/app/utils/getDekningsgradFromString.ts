import { Dekningsgrad } from 'app/types/Dekningsgrad';

export const getDekningsgradFromString = (dekningsgrad: string | undefined) => {
    if (!dekningsgrad) {
        return Dekningsgrad.HUNDRE_PROSENT;
    }

    return dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? Dekningsgrad.HUNDRE_PROSENT : Dekningsgrad.ÅTTI_PROSENT;
};
