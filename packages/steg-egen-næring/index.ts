import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export const egenNæringMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as EgenNæringPanel } from './src/EgenNæringPanel';
export type { EgenNæring } from './src/types/egenNæring';
export { Næringstype } from './src/types/egenNæring';
