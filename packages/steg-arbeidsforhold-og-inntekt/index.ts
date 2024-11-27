import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const arbeidsforholdOgInntektMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { ArbeidsforholdOgInntektPanel } from './src/ArbeidsforholdOgInntektPanel';
//TODO Usikker på om desse to bør ligga i denne pakka sidan dei i tillegg blir brukt i oppsummering i FP
export { HarArbeidsforhold } from './src/components/arbeidsforhold-informasjon/HarArbeidsforhold';
export { HarIkkeArbeidsforhold } from './src/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
