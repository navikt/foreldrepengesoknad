import { Søkerrolle } from '@navikt/fp-common';

export const isFarEllerMedmor = (rolle: Søkerrolle) => {
    if (rolle === 'far' || rolle === 'medmor') {
        return true;
    }

    return false;
};
