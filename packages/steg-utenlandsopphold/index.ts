import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const utenlandsoppholdMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as UtenlandsoppholdPanel } from './src/utenlandsopphold/UtenlandsoppholdPanel';
export { default as SenereUtenlandsoppholdPanel } from './src/utenlandsoppholdSenere/SenereUtenlandsoppholdPanel';
export { default as TidligereUtenlandsoppholdPanel } from './src/utenlandsoppholdTidligere/TidligereUtenlandsoppholdPanel';
