import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export { tidperiodeOverlapperDato, andreAugust2022ReglerGjelder } from './src/utils/dateUtils';
export {
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getFørsteUttaksdagForeldrepengerFørFødsel,
    ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL,
} from './src/utils/wlbUtils';
export {
    isUttaksperiode,
    isUtsettelsesperiode,
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
} from './src/utils/periodeUtils';
export { UttaksplanNy } from './src/Uttaksplan';
export { KvoteOppsummering } from './src/KvoteOppsummering';
export { UttaksplanKalender } from './src/kalender/UttaksplanKalender';
export { UttaksplanDataProvider } from './src/context/UttaksplanDataContext';
export { UttaksplanRedigeringProvider } from './src/context/UttaksplanRedigeringContext';
export { FjernAltIUttaksplanModal } from './src/components/FjernAltIUttaksplanModal';

export const nyUttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export type { Planperiode } from './src/types/Planperiode';
export { PeriodeHullType } from './src/types/Planperiode';

export { finnOgSettInnHull } from './src/builder/uttaksplanbuilderUtils';
