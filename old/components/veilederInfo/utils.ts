import { VeilederMessage } from './types';

export const veilederMessageAvsnitt = (
    førsteTekst: VeilederMessage[],
    andreTekst: VeilederMessage[],
    visInfoOmPrematuruker: boolean
): VeilederMessage[] => {
    return visInfoOmPrematuruker === false ? førsteTekst : førsteTekst.concat(andreTekst);
};
