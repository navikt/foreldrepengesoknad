import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const utenlandsoppholdMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { UtenlandsoppholdPanel } from './src/utenlandsopphold/UtenlandsoppholdPanel';
export { SenereUtenlandsoppholdPanel } from './src/utenlandsopphold-senere/SenereUtenlandsoppholdPanel';
export { TidligereUtenlandsoppholdPanel } from './src/utenlandsopphold-tidligere/TidligereUtenlandsoppholdPanel';
