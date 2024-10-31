import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

export { default as UttaksplanNy } from './Uttaksplan';

export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
};

export type { Planperiode } from './types/Planperiode';
export { PeriodeHullType } from './types/Planperiode';

export { finnOgSettInnHull } from './builder/uttaksplanbuilderUtils';
