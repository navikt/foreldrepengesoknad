import {
    AnnenInntekt,
    JobbIUtlandetInntekt
} from '../../types/søknad/AnnenInntekt';
import {
    arbeidsgiverNavnVisible,
    landVisible,
    vedleggVisible
} from '../../components/annen-inntekt-modal/visibility';

const cleanupAnnenInntekt = (inntekt: AnnenInntekt): AnnenInntekt => {
    if (!vedleggVisible(inntekt)) {
        delete inntekt.vedlegg;
    }
    if (!landVisible(inntekt) || !arbeidsgiverNavnVisible(inntekt)) {
        delete (inntekt as JobbIUtlandetInntekt).land;
        delete (inntekt as JobbIUtlandetInntekt).arbeidsgiverNavn;
    }
    return inntekt;
};

export default cleanupAnnenInntekt;
