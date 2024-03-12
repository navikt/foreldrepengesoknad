import { DayOfWeek } from 'react-day-picker';
import { Accept } from 'react-dropzone';

import { DatepickerDateRange } from '@navikt/fp-types';

export enum YesOrNo {
    'YES' = 'yes',
    'NO' = 'no',
    'UNANSWERED' = 'unanswered',
}

export interface InputTime {
    hours: string;
    minutes: string;
}
export interface DateRange {
    from: Date;
    to: Date;
}
export interface OpenDateRange {
    from: Date;
    to?: Date;
}

export type CancelButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'danger';

export type FormError = React.ReactNode | boolean;

export interface TestProps {
    'data-testid'?: string;
}

export interface TypedFormInputValidationProps<FieldName, ErrorType> {
    validate?: (value: any, fieldName: FieldName) => ErrorType | undefined;
}

export interface UseFastFieldProps {
    useFastField?: boolean;
}

export interface CustomFormErrorHandler<ErrorType> {
    fieldErrorHandler: FieldErrorHandler<ErrorType>;
    isHandledErrorTypeFunc?: ErrorTypeChecker<ErrorType>;
}

export type FieldErrorHandler<ErrorType> = (error: ErrorType, fieldName: string) => string;
export type ErrorTypeChecker<ErrorType = any> = (error: ErrorType) => boolean;

export const FileDropAcceptImagesAndPdf: Accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': [],
    'application/pdf': [],
};

export interface DatepickerLimitationsString {
    minDate?: string;
    maxDate?: string;
    invalidDateRanges?: DatepickerDateRange[];
    weekendsNotSelectable?: boolean;
    disabledDaysOfWeek?: DayOfWeek;
}
