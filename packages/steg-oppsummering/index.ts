import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const oppsummeringMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as OppsummeringPanel } from './src/OppsummeringPanel';
export {
    ArbeidsforholdOppsummering,
    FrilansOppsummering,
    SelvstendigNæringsdrivendeOppsummering,
} from './src/arbeidsforhold/ArbeidsforholdOppsummering';
export { default as BoIUtlandetOppsummering, HendelseType } from './src/utenlandsopphold/BoIUtlandetOppsummering';
