import enMessages from './src/intl/messages/en_US.json';
import nbMessages from './src/intl/messages/nb_NO.json';
import nnMessages from './src/intl/messages/nn_NO.json';

export { captureException, captureMessage, withScope } from '@sentry/browser';
export { ApiError } from './src/ApiError';
export { captureApiError } from './src/captureApiError';
export { SkyraSurvey } from './src/components/SkyraSurvey';
export type { SkyraSurveyProps } from './src/components/SkyraSurvey';
export { initSentry } from './src/initSentry';
export { kyWithSentry } from './src/kyWithSentry';
export { loggUmamiEvent } from './src/umami';

export const observabilityMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};
