import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const arbeidsforholdOgInntektMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as ArbeidsforholdOgInntektPanel } from './src/ArbeidsforholdOgInntektPanel';
export type { ArbeidsforholdOgInntektFp, ArbeidsforholdOgInntektSvp } from './src/types/ArbeidsforholdOgInntekt';
//TODO Usikker på om desse to bør ligga i denne pakka sidan dei i tillegg blir brukt i oppsummering i FP
export { default as HarArbeidsforhold } from './src/components/arbeidsforhold-informasjon/HarArbeidsforhold';
export { default as HarIkkeArbeidsforhold } from './src/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
