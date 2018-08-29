import { AnnenInntekt, JobbIUtlandetInntekt } from '../../types/søknad/AnnenInntekt';
import visibility from '../../components/annen-inntekt-modal/visibility';

const cleanupAnnenInntekt = (inntekt: AnnenInntekt): AnnenInntekt => {
    if (!visibility.vedlegg(inntekt)) {
        delete inntekt.vedlegg;
    }
    if (!visibility.land(inntekt) || !visibility.arbeidsgiverNavn(inntekt)) {
        delete (inntekt as JobbIUtlandetInntekt).land;
        delete (inntekt as JobbIUtlandetInntekt).arbeidsgiverNavn;
    }
    return inntekt;
};

export default cleanupAnnenInntekt;
