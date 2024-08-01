import { useFormikContext } from 'formik';
import React from 'react';

import { DatePickerProps } from '@navikt/ds-react';

import { TypedFormInputValidationProps, UseFastFieldProps } from './../../types';
import FormikDatepicker, { DatePickerBaseProps, DatepickerLimitations } from './../formik-datepicker/FormikDatepicker';
import { ISOStringToDate } from './../formik-datepicker/datepickerUtils';
import FormikInputGroup from './../formik-input-group/FormikInputGroup';
import './dateRangePicker.scss';
import { getDateRangePickerLimitations } from './dateRangePickerUtils';

interface OwnProps<FieldName, ErrorType> {
    legend: string;
    description?: React.ReactNode;
    locale?: string;
    allowRangesToStartAndStopOnSameDate?: boolean;
    fromInputProps: DatePickerBaseProps<FieldName, ErrorType>;
    toInputProps: DatePickerBaseProps<FieldName, ErrorType>;
}

export type FormikDateRangePickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    DatepickerLimitations &
    UseFastFieldProps &
    Pick<DatePickerProps, 'dropdownCaption'>;

function FormikDateRangePicker<FieldName, ErrorType>({
    legend,
    fromInputProps,
    toInputProps,
    description,
    minDate,
    maxDate,
    disableWeekends,
    disabledDateRanges,
    allowRangesToStartAndStopOnSameDate,
    useFastField,
    dropdownCaption,
    validate,
    locale,
}: FormikDateRangePickerProps<FieldName, ErrorType>) {
    const { values } = useFormikContext<any>();

    const fromDate = ISOStringToDate(values[fromInputProps.name]);
    const toDate = ISOStringToDate(values[toInputProps.name]);

    const { fromDateLimitations, toDateLimitations } = getDateRangePickerLimitations({
        fromDate,
        toDate,
        minDate,
        maxDate,
        dateRanges: disabledDateRanges,
        disableWeekends,
        allowRangesToStartAndStopOnSameDate,
    });

    const name = `${fromInputProps.name}_${toInputProps.name}` as any;

    return (
        <FormikInputGroup
            name={name}
            legend={legend}
            description={description}
            className="dateRangePicker"
            validate={validate ? (value: any) => validate(value, name) : undefined}
        >
            <div className="dateRangePicker__flexContainer">
                <FormikDatepicker<FieldName, ErrorType>
                    {...fromInputProps}
                    {...fromDateLimitations}
                    dropdownCaption={dropdownCaption}
                    locale={locale as any}
                    useFastField={useFastField}
                />
                <FormikDatepicker<FieldName, ErrorType>
                    {...toInputProps}
                    {...toDateLimitations}
                    dropdownCaption={dropdownCaption}
                    locale={locale as any}
                    useFastField={useFastField}
                />
            </div>
        </FormikInputGroup>
    );
}

export default FormikDateRangePicker;
