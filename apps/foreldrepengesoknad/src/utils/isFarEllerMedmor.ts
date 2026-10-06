import { Søkerrolle } from '@navikt/fp-types';

export const isFarEllerMedmor = (rolle: Søkerrolle) => {
    return rolle === 'far' || rolle === 'medmor';
};
