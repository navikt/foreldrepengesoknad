import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

(window as any).appSettings = {
    REST_API_URL: '',
};
window.scrollTo = () => ({});

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
