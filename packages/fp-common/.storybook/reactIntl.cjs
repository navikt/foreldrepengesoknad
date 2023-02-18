import nb from '../src/common/i18n/common.nb.json';
import nn from '../src/common/i18n/common.nn.json';
const locales = ['nb', 'nn'];

const messages = locales.reduce(
    (acc, lang) => ({
        ...acc,
        [lang]: lang === 'nb' ? nb : nn,
    }),
    {}
);

export const reactIntl = {
    defaultLocale: 'nb',
    locales,
    messages,
};
