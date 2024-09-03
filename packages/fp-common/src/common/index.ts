import enMessages from './i18n/common.en.json';
import nbMessages from './i18n/common.nb.json';
import nnMessages from './i18n/common.nn.json';

export { default as allCommonMessages } from './i18n/allCommonMessages';

export * from './types';

export * from './utils/dateUtils';
export * from './utils/validationUtils';
export * from './utils/Perioden';
export * from './utils/Periodene';

export const fpCommonMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};
