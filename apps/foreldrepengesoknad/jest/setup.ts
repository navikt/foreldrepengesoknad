import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/locale-data/nb';
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/nb';

console.log('fuck you');

jest.mock('./Environment.ts');

window.scrollTo = () => ({});
global.IS_REACT_ACT_ENVIRONMENT = true;
