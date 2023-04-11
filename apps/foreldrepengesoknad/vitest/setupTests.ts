import { expect } from 'vitest';
// import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const scriptTag = document.createElement('script');
scriptTag.type = 'test/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'http://localhost:8888/rest',
    UTTAK_API_URL: 'https://foreldrepengesoknad-api.nav.no',
    LOGIN_URL: 'http://localhost:8888/local/cookie',
    APP_VERSION: 'dev',
    FAMILIE: 'https://familie.dev.nav.no',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
    FEATURE_VIS_PERIODER_SOM_SENDES_INN: 'on',
    FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: 'on',
});
document.head.appendChild(scriptTag);
