import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Modal } from '@navikt/ds-react';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/locale-data/nb';
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/nb';

jest.mock('./../src/app/Environment.ts', () => ({
    REST_API_URL: 'test',
    UTTAK_API_URL: 'uttak-url',
    LOGIN_URL: 'test',
    APP_VERSION: 'test',
    FAMILIE: 'test',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
    FEATURE_VIS_PERIODER_SOM_SENDES_INN: 'on',
    FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: 'off',
}));

window.scrollTo = () => ({});
global.IS_REACT_ACT_ENVIRONMENT = true;

if (Modal.setAppElement) {
    Modal.setAppElement('body');
}
