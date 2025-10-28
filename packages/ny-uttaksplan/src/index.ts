import enMessages from './intl/en_US.json';
import nbMessages from './intl/nb_NO.json';
import nnMessages from './intl/nn_NO.json';

export { splittSaksperiodePåDato, splittSaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';
export { tidperiodeOverlapperDato, andreAugust2022ReglerGjelder } from './utils/dateUtils';
export {
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getFørsteUttaksdagForeldrepengerFørFødsel,
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
    utledKomplettPlan,
} from './utils/periodeUtils';
export { UttaksplanNy } from './Uttaksplan';
export { KvoteOppsummering } from './KvoteOppsummering';
export { UttaksplanKalender } from './kalender/UttaksplanKalender';

export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export type { Planperiode } from './types/Planperiode';
export { PeriodeHullType } from './types/Planperiode';

export { finnOgSettInnHull } from './builder/uttaksplanbuilderUtils';
