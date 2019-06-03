import { AnnenInntekt, JobbIUtlandetInntekt } from '../../types/søknad/AnnenInntekt';
import visibility from '../../components/dialoger/annen-inntekt-modal/visibility';

const cleanupAnnenInntekt = (inntekt: AnnenInntekt): AnnenInntekt => {
    if (!visibility.vedlegg(inntekt)) {
        delete inntekt.vedlegg;
    }
    if (!visibility.arbeidsgiverNavn(inntekt)) {
        delete (inntekt as JobbIUtlandetInntekt).arbeidsgiverNavn;
    }
    if (!visibility.land(inntekt)) {
        delete (inntekt as JobbIUtlandetInntekt).land;
    }
    return inntekt;
};

export default cleanupAnnenInntekt;
