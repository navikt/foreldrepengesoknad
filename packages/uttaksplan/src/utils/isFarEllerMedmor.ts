import { Søkerrolle } from '@navikt/fp-common';

const isFarEllerMedmor = (rolle: Søkerrolle) => {
    if (rolle === 'far' || rolle === 'medmor') {
        return true;
    }

    return false;
};

// eslint-disable-next-line import/no-default-export
export default isFarEllerMedmor;
