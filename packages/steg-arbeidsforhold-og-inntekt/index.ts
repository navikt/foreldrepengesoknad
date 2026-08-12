import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const arbeidsforholdOgInntektMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { ArbeidsforholdOgInntektPanel } from './src/ArbeidsforholdOgInntektPanel';
export { AndreInntektskilderFieldArray } from './src/components/andre-inntekter/AndreInntektskilderFieldArray';
export { HarArbeidsforhold } from './src/components/arbeidsforhold-informasjon/HarArbeidsforhold';
export { HarIkkeArbeidsforhold } from './src/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
export {
    type AnnenInntektType,
    type AndreInntektskilder,
    type AndreInntektskilderUtkast,
    type AndreInntekterFormValues,
    erFerdigUtfylt,
} from './src/types/AndreInntektskilder';
