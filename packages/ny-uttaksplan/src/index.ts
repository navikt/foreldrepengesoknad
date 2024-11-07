import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

export { splittSaksperiodePåDato, splittSaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';
export { tidperiodeOverlapperDato, andreAugust2022ReglerGjelder } from './utils/dateUtils';
export {
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
    ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL,
} from './utils/wlbUtils';
export {
    isUttaksperiode,
    isUtsettelsesperiode,
    isUttaksperiodeAnnenPart,
    isAnnenPartsPeriode,
    isAvslåttPeriode,
    isForeldrepengerFørFødselPeriode,
    isHull,
    isOppholdsperiode,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isUtsettelsesperiodeAnnenPart,
    sorterPerioder,
} from './utils/periodeUtils';
export { default as UttaksplanNy } from './Uttaksplan';

export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
};

export type { Planperiode } from './types/Planperiode';
export { PeriodeHullType } from './types/Planperiode';

export { finnOgSettInnHull } from './builder/uttaksplanbuilderUtils';
