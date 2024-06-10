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
export { getBrukteDager } from './utils/brukteDagerUtils';
export {
    getFørsteUttaksdagForeldrepengerFørFødsel,
    getFørsteUttaksdagAnkomstdatoNorge,
    getFørsteUttaksdagDatoForAleneomsorg,
} from './utils/uttaksdatoerUtils';
export { splittPeriodePåDato, splittUttaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';
export { finnOgSettInnHull, settInnAnnenPartsUttak } from './builder/uttaksplanbuilderUtils';
