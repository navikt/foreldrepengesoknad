import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const arbeidsforholdOgInntektMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as ArbeidsforholdOgInntektPanel } from './src/ArbeidsforholdOgInntektPanel';
export type { Inntektsinformasjon } from './src/types/Inntektsinformasjon';
