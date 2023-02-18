import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/locale-data/nb';
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/nb';

(window as any).appSettings = {
    REST_API_URL: '',
    UTTAK_API_URL: 'uttak-url',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
};
window.scrollTo = () => ({});
global.IS_REACT_ACT_ENVIRONMENT = true;

// jest.mock('react-intl', () => {
//     const reactIntl = jest.requireActual('react-intl');
//     const messages = jest.requireActual('../src/app/intl/nb_NO.json');
//     const cache = reactIntl.createIntlCache();
//     const intl = new reactIntl.createIntl(
//         {
//             locale: 'no',
//             messages,
//         },
//         cache
//     );

//     return {
//         ...reactIntl,
//         useIntl: () => {
//             return intl;
//         },
//     };
// });
