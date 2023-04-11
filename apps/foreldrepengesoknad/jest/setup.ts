import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/locale-data/nb';
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/nb';

// const scriptTag = document.createElement('script');
// scriptTag.type = 'test/json';
// scriptTag.id = 'nav:appSettings';
// scriptTag.innerHTML = JSON.stringify({
//     REST_API_URL: 'test',
//     UTTAK_API_URL: 'test',
//     LOGIN_URL: 'test',
//     APP_VERSION: 'test',
//     FAMILIE: 'test',
//     FEATURE_VIS_FEILSIDE: 'off',
//     FEATURE_VIS_ALERTSTRIPE: 'on',
//     FEATURE_VIS_PERIODER_SOM_SENDES_INN: 'on',
//     FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: 'on',
// });
// document.head.appendChild(scriptTag);

jest.mock('./../src/app/Environment.ts', () => ({
    REST_API_URL: 'test',
    UTTAK_API_URL: 'uttak-url',
    LOGIN_URL: 'test',
    APP_VERSION: 'test',
    FAMILIE: 'test',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
    FEATURE_VIS_PERIODER_SOM_SENDES_INN: 'on',
    FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: 'on',
}));

window.scrollTo = () => ({});
global.IS_REACT_ACT_ENVIRONMENT = true;
