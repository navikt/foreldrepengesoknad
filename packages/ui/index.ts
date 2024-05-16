import enMessages from './src/i18n/messages/en_US.json';
import nbMessages from './src/i18n/messages/nb_NO.json';
import nnMessages from './src/i18n/messages/nn_NO.json';

export const uiMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as ContentWrapper } from './src/contentWrapper/ContentWrapper';
export { default as ErrorBoundary } from './src/error/ErrorBoundary';
export { default as ErrorSummaryFp } from './src/error/ErrorSummaryFp';
export type { ErrorSummaryError } from './src/error/ErrorSummaryFp';
export { default as ErrorPage } from './src/error/ErrorPage';
export { default as FileUploader } from './src/fileUploader/FileUploader';
export { default as AttachmentList } from './src/fileUploader/liste/AttachmentList';
export { default as StepButtons } from './src/step/StepButtons';
export { default as ScanDocumentInfo } from './src/scanDocumentInfo/ScanDocumentInfo';
export { default as HorizontalLine } from './src/horizontalLine/HorizontalLine';
export { default as Umyndig } from './src/umyndig/Umyndig';
export { default as LanguageToggle } from './src/languageToggle/LanguageToggle';
export { default as IntlProvider } from './src/i18n/IntlProvider';
export { default as Step } from './src/step/pageStep/Step';
export { default as ProgressStepper } from './src/step/progressStepper/ProgressStepper';
export { default as Calendar } from './src/calendar/Calendar';
export { default as CalendarLabel } from './src/calendar/label/CalendarLabel';
export type { ProgressStep } from './src/step/progressStepper/ProgressStepper';
export type { Period } from './src/calendar/Calendar';
