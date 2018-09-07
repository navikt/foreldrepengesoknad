import { Adopsjonsbarn } from '../../types/søknad/Barn';

const cleanupAdopsjonsSteg = (barn: Adopsjonsbarn): Adopsjonsbarn => {
    if (barn.adopsjonAvEktefellesBarn) {
        barn.adoptertIUtlandet = undefined;
        barn.ankomstdato = undefined;
    }

    if (barn.adoptertIUtlandet === false) {
        barn.ankomstdato = undefined;
    }

    return barn;
};

export default cleanupAdopsjonsSteg;
