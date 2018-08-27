import {
    AnnenInntektPartial,
    AnnenInntektType
} from '../../types/søknad/AnnenInntekt';

type VisibilityFunction = (annenInntekt: AnnenInntektPartial) => boolean;
interface FieldVisibilityFunctions {
    land: VisibilityFunction;
    arbeidsgiverNavn: VisibilityFunction;
    vedlegg: VisibilityFunction;
}

export const landVisible: VisibilityFunction = (
    annenInntekt: AnnenInntektPartial
) => {
    const { type } = annenInntekt;
    return type === AnnenInntektType.JOBB_I_UTLANDET;
};

export const arbeidsgiverNavnVisible: VisibilityFunction = (
    annenInntekt: AnnenInntektPartial
) => {
    const { type } = annenInntekt;
    return type === AnnenInntektType.JOBB_I_UTLANDET;
};

export const vedleggVisible: VisibilityFunction = (
    annenInntekt: AnnenInntektPartial
) => {
    const { type } = annenInntekt;
    return type !== AnnenInntektType.LØNN_VED_VIDEREUTDANNING;
};

const fieldVisibilityFunctions: FieldVisibilityFunctions = {
    land: landVisible,
    arbeidsgiverNavn: arbeidsgiverNavnVisible,
    vedlegg: vedleggVisible
};

export default fieldVisibilityFunctions;
