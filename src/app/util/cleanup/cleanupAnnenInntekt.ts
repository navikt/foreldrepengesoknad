import { AnnenInntekt } from '../../types/søknad/AnnenInntekt';
import visibility from '../../steg/andreInntekter/annenInntektModal/visibility';

const cleanupAnnenInntekt = (inntekt: any): AnnenInntekt => {
    if (!visibility.vedlegg(inntekt)) {
        delete inntekt.vedlegg;
    }
    if (!visibility.arbeidsgiverNavn(inntekt)) {
        delete inntekt.arbeidsgiverNavn;
    }
    if (!visibility.land(inntekt)) {
        delete inntekt.land;
    }

    return inntekt;
};

export default cleanupAnnenInntekt;
