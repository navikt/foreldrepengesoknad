import enMessages from './i18n/common.en.json';
import nbMessages from './i18n/common.nb.json';
import nnMessages from './i18n/common.nn.json';

export { default as allCommonMessages } from './i18n/allCommonMessages';

export * from './types';

export { capitalizeFirstLetter } from './utils/stringUtils';

export { default as useDocumentTitle } from './utils/useDocumentTitle';
export { default as isFarEllerMedmor } from './utils/isFarEllerMedmor';
export { default as intlUtils } from './utils/intlUtils';
export * from './utils/intlUtils';
export * from './utils/localeUtils';
export * from './utils/personUtils';
export * from './utils/stønadskontoerUtils';
export * from './utils/dateUtils';
export * from './utils/validationUtils';
export * from './utils/periodeUtils';
export * from './utils/Perioden';
export * from './utils/Periodene';
export * from './utils/Uttaksdagen';
export * from './utils/Tidsperioden';
export * from './utils/numberUtils';
export * from './utils/morsAktivitetUtils';
export * from './utils/vedleggUtils';
export * from './utils/fridagerUtils';
export * from './utils/globalUtil';
export { guid } from './utils/guid';

export const fpCommonMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};
