import enMessages from './messages/en_US.json';
import nbMessages from './messages/nb_NO.json';
import nnMessages from './messages/nn_NO.json';

/**
 * Egen fil (i stedet for kun å eksportere fra pakkens barrel `index.ts`) slik at
 * forbrukere som kun trenger i18n-meldingene kan importere disse uten å dra med
 * seg resten av @navikt/fp-uttaksplan (kalender, lister, forslagsmotor osv.) inn
 * i eagerly-lastede deler av applikasjonen.
 */
export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};
