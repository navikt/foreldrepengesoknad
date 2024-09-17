import enMessages from './src/i18n/messages/en_US.json';
import nbMessages from './src/i18n/messages/nb_NO.json';
import nnMessages from './src/i18n/messages/nn_NO.json';

export const uiMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { default as ContentWrapper } from './src/content-wrapper/ContentWrapper';
export { default as ErrorBoundary } from './src/error/ErrorBoundary';
export { default as ErrorSummaryFp } from './src/error/ErrorSummaryFp';
export { default as SimpleErrorPage } from './src/error/SimpleErrorPage';
export type { ErrorSummaryError } from './src/error/ErrorSummaryFp';
export { default as ErrorPage } from './src/error/ErrorPage';
export { default as FileUploader } from './src/file-uploader/FileUploader';
export { default as StepButtons } from './src/step/StepButtons';
export { default as ScanDocumentInfo } from './src/scan-document-info/ScanDocumentInfo';
export { default as HorizontalLine } from './src/horizontal-line/HorizontalLine';
export { default as Umyndig } from './src/umyndig/Umyndig';
export { default as LanguageToggle } from './src/language-toggle/LanguageToggle';
export { default as LanguageToggleNew } from './src/language-toggle-new/LanguageToggle';
export { default as IntlProvider } from './src/i18n/IntlProvider';
export { default as Step } from './src/step/page-step/Step';
export { default as ProgressStepper } from './src/step/progress-stepper/ProgressStepper';
export { default as Calendar } from './src/calendar/Calendar';
export { default as CalendarLabel } from './src/calendar/label/CalendarLabel';
export type { ProgressStep } from './src/step/progress-stepper/ProgressStepper';
export type { Period } from './src/calendar/Calendar';
export { default as Page } from './src/page/Page';
export { default as BlueHeading } from './src/boxes/BlueHeading';
export { default as BluePanel } from './src/boxes/BluePanel';
export { default as Infobox } from './src/boxes/Infobox';
export { default as IconCircleWrapper } from './src/icon-circle/IconCircleWrapper';
export { default as ByttBrowserModal } from './src/bytt-browser-modal/ByttBrowserModal';
export { default as VeiviserPage } from './src/veivisere/VeiviserPage';
export { default as AndreVeivisereLinkPanel } from './src/veivisere/andre-veivisere/AndreVeivisereLinkPanel';
export { default as FrontPage } from './src/veivisere/frontpage/FrontPage';
