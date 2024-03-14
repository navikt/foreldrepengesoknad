/* eslint-disable no-console */
import { DatePickerProps } from '@navikt/ds-react';
import React from 'react';
import { DayOfWeek } from 'react-day-picker';
import { FastField, Field, FieldProps } from 'formik';
import { DateRange, FormError, TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getErrorPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import DateInputAndPicker from './date-input-and-picker/DateInputAndPicker';
import { ISODateString } from './dateFormatUtils';

export type DatepickerLimitations = {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekends?: boolean;
    disabledDaysOfWeek?: DayOfWeek;
};

export interface DatePickerBaseProps<FieldName, ErrorType>
    extends TestProps,
        TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    label: string;
    error?: FormError;
    onChange?: (date: ISODateString) => void;
    defaultMonth?: Date;
    inputDisabled?: boolean;
}

interface OwnProps<FieldName, ErrorType> extends DatePickerBaseProps<FieldName, ErrorType> {
    id?: string;
    inputId?: string;
    description?: React.ReactNode;
}

export type FormikDatepickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    Omit<DatePickerProps, 'onChange' | 'fromDate' | 'toDate'> &
    UseFastFieldProps &
    DatepickerLimitations;

function FormikDatepicker<FieldName, ErrorType>({
    name,
    error,
    inputId,
    onChange,
    validate,
    useFastField,
    ...restProps
}: FormikDatepickerProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps<string>) => {
                const handleOnChange = (dateString = '') => {
                    if (field.value !== dateString) {
                        form.setFieldValue(field.name, dateString);
                        if (onChange) {
                            onChange(dateString);
                        }
                        if (context) {
                            context.onAfterFieldValueSet();
                        }
                    }
                };

                return (
                    <DateInputAndPicker
                        inputId={inputId}
                        name={name as any}
                        onChange={handleOnChange}
                        value={field.value}
                        error={getErrorPropForFormikInput({ field, form, context, error })}
                        {...restProps}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikDatepicker;
