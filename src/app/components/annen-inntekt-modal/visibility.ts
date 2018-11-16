import { AnnenInntektPartial, AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import VisibilityFunction from '../../types/dom/Visibility';

const landVisible: VisibilityFunction<AnnenInntektPartial> = (annenInntekt: AnnenInntektPartial) => {
    const { type } = annenInntekt;
    return type === AnnenInntektType.JOBB_I_UTLANDET;
};

const arbeidsgiverNavnVisible: VisibilityFunction<AnnenInntektPartial> = (annenInntekt: AnnenInntektPartial) => {
    const { type } = annenInntekt;
    return type === AnnenInntektType.JOBB_I_UTLANDET;
};

const vedleggVisible: VisibilityFunction<AnnenInntektPartial> = (annenInntekt: AnnenInntektPartial) => {
    const { type } = annenInntekt;
    return type !== AnnenInntektType.LØNN_VED_VIDEREUTDANNING && type !== AnnenInntektType.JOBB_I_UTLANDET;
};

export default {
    land: landVisible,
    arbeidsgiverNavn: arbeidsgiverNavnVisible,
    vedlegg: vedleggVisible
};
