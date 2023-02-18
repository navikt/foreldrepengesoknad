import { Søkerrolle } from 'app/types/Søkerrolle';

const isFarEllerMedmor = (rolle: Søkerrolle) => {
    if (rolle === 'far' || rolle === 'medmor') {
        return true;
    }

    return false;
};

export default isFarEllerMedmor;
