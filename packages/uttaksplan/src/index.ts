import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

export { default as Uttaksplan } from './Uttaksplan';

export const uttaksplanMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};
export * from './utils/manglendeVedleggUtils';
export * from './utils/uttaksplanUtils';
export * from './utils/leggTilAnnenPartsPerioderISøkerenesUttaksplan';
export { convertYesOrNoOrUndefinedToBoolean, convertBooleanOrUndefinedToYesOrNo } from './utils/formUtils';
export { getPeriodeTittel, finnesPeriodeIOpprinneligPlan } from './utils/periodeUtils';
export { getFørsteUttaksdag2UkerFørFødsel, getPerioderMedUttakRundtFødsel } from './utils/wlbUtils';
export { getBrukteDager } from './utils/brukteDagerUtils';
export {
    getFørsteUttaksdagForeldrepengerFørFødsel,
    getFørsteUttaksdagAnkomstdatoNorge,
    getFørsteUttaksdagDatoForAleneomsorg,
} from './utils/uttaksdatoerUtils';
export { splittPeriodePåDato, splittUttaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';
export { finnOgSettInnHull, settInnAnnenPartsUttak } from './builder/uttaksplanbuilderUtils';
export { default as PeriodelisteItemHeader } from './components/periodeliste-item-header/PeriodelisteItemHeader';
export { getTypedFormComponents, YesOrNo } from './formik-wrappers';
export type { QuestionVisibility, QuestionConfig } from './formik-wrappers';
export { Questions } from './formik-wrappers';
export { default as uttaksConstants } from './common/uttaksConstants';
export { getForeldreparSituasjon } from './utils/foreldreparSituasjonUtils';
export { uttaksplanDatoavgrensninger } from './utils/uttaksplanDatoavgrensninger';
export { sorterPerioder, Periodene } from './utils/Periodene';
export {
    andreAugust2022ReglerGjelder,
    førsteOktober2021ReglerGjelder,
    tidperiodeOverlapperDato,
    convertTidsperiodeToTidsperiodeDate,
    dateIsWithinRange,
} from './utils/dateUtils';
export { Perioden } from './utils/Perioden';
export {
    appendPeriodeNavnHvisUttakRundtFødselFarMedmor,
    uttaksperiodeKanJusteresVedFødsel,
    starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel,
    farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato,
    getLengdePåForeslåttWLBUttakFarMedmor,
} from './utils/wlbUtils';
