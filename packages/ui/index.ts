import enMessages from './src/i18n/messages/en_US.json';
import nbMessages from './src/i18n/messages/nb_NO.json';
import nnMessages from './src/i18n/messages/nn_NO.json';

export const uiMessages = {
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
};

export { SkjemaRotLayout } from './src/skjema-rotlayout/SkjemaRotLayout';
export { ErrorBoundary } from './src/error/ErrorBoundary';
export { ErrorSummaryFp } from './src/error/ErrorSummaryFp';
export { SimpleErrorPage } from './src/error/SimpleErrorPage';
export type { ErrorSummaryError } from './src/error/ErrorSummaryFp';
export { ErrorPage } from './src/error/ErrorPage';
export { FileUploader } from './src/file-uploader/FileUploader';
export { StepButtons } from './src/step/StepButtons';
export { ScanDocumentInfo } from './src/scan-document-info/ScanDocumentInfo';
export { HorizontalLine } from './src/horizontal-line/HorizontalLine';
export { Umyndig } from './src/umyndig/Umyndig';
export { IntlProvider } from './src/i18n/IntlProvider';
export { Step } from './src/step/page-step/Step';
export { StepFooter } from './src/step/page-step/step-footer/StepFooter';
export { ProgressStepper } from './src/step/progress-stepper/ProgressStepper';
export { Calendar } from './src/calendar/Calendar';
export { CalendarLabel } from './src/calendar/label/CalendarLabel';
export type { CalendarPeriodColor } from './src/calendar/types/CalendarPeriodColor';
export type { CalendarPeriod } from './src/calendar/types/CalendarPeriod';
export type { ProgressStep } from './src/step/progress-stepper/ProgressStepper';
export { Page } from './src/page/Page';
export { BlueHeading } from './src/boxes/BlueHeading';
export { BluePanel } from './src/boxes/BluePanel';
export { Infobox } from './src/boxes/Infobox';
export { IconCircleWrapper } from './src/icon-circle/IconCircleWrapper';
export { ByttBrowserModal } from './src/bytt-browser-modal/ByttBrowserModal';
export { VeiviserPage } from './src/veivisere/VeiviserPage';
export { FrontPage } from './src/veivisere/frontpage/FrontPage';
export { RegisterdataUtdatert } from './src/registerdata-utdatert/RegisterdataUtdatert';
export { Spinner } from './src/loaders/Spinner';
