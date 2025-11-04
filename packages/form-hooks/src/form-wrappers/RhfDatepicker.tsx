import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { JSX, ReactNode, useState } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT, TIDENES_ENDE, TIDENES_MORGEN } from '@navikt/fp-constants';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

dayjs.extend(customParseFormat);

const INVALID_DATE = 'Invalid Date';
const isValidDateString = (date: string): boolean => date !== INVALID_DATE;

const findDisabledDays = (minDate?: Date, maxDate?: Date): Array<{ from: Date; to?: Date }> => {
    const disabledDays = [];
    if (minDate) {
        disabledDays.push({
            from: dayjs(TIDENES_MORGEN).toDate(),
            to: dayjs(minDate).subtract(1, 'day').toDate(),
        });
    }
    if (maxDate) {
        disabledDays.push({
            from: dayjs(maxDate).add(1, 'day').toDate(),
            to: dayjs(TIDENES_ENDE).toDate(),
        });
    }
    return disabledDays;
};

type Props<T extends FieldValues> = {
    label?: string | ReactNode;
    description?: string;
    validate?: Array<(value: string) => ValidationReturnType>;
    onChange?: (value: string) => void;
    minDate?: Date | Dayjs | string;
    maxDate?: Date | Dayjs | string;
    defaultMonth?: Date | Dayjs | string;
    showMonthAndYearDropdowns?: boolean;
    disableWeekends?: boolean;
    autofocusWhenEmpty?: boolean;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
    useStrategyAbsolute?: boolean;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfDatepicker = <T extends FieldValues>({
    label,
    description,
    validate = [],
    onChange,
    minDate,
    maxDate,
    defaultMonth,
    showMonthAndYearDropdowns,
    disableWeekends,
    autofocusWhenEmpty,
    customErrorFormatter,
    useStrategyAbsolute = false,
    ...controllerProps
}: Props<T>): JSX.Element => {
    const { name, control } = controllerProps;

    const intl = useIntl();
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        control,
        rules: {
            validate: getValidationRules(validate),
        },
    });

    const defaultDate = field.value ? dayjs(field.value, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT) : '';
    const [fieldValue, setFieldValue] = useState<string>(isValidDateString(defaultDate) ? defaultDate : '');

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: (date) => {
            if (date !== undefined) {
                const verdi = dayjs(date).format(ISO_DATE_FORMAT);
                if (onChange) {
                    onChange(verdi);
                }
                field.onChange(verdi);
                setFieldValue(dayjs(verdi, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT));
            }
        },
        defaultSelected:
            field.value && isValidDateString(defaultDate)
                ? dayjs(field.value, ISO_DATE_FORMAT, true).toDate()
                : undefined,
        defaultMonth: defaultMonth ? dayjs(defaultMonth).toDate() : undefined,
    });

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const verdi = dayjs(event.target.value, DDMMYYYY_DATE_FORMAT, true).format(ISO_DATE_FORMAT);
        const isValidDate = isValidDateString(verdi);

        setFieldValue(event.target.value);
        if (onChange) {
            onChange(isValidDate ? verdi : event.target.value);
        }
        field.onChange(isValidDate ? verdi : event.target.value);
    };

    const fromDate = minDate ? dayjs(minDate).toDate() : undefined;
    const toDate = maxDate ? dayjs(maxDate).toDate() : undefined;
    const disabledDays = fromDate || toDate ? findDisabledDays(fromDate, toDate) : undefined;

    return (
        <DatePicker
            {...datepickerProps}
            disabled={disabledDays}
            strategy={useStrategyAbsolute ? 'absolute' : 'fixed'}
            dropdownCaption={showMonthAndYearDropdowns}
            fromDate={fromDate}
            toDate={toDate}
            disableWeekends={disableWeekends}
        >
            <DatePicker.Input
                {...inputProps}
                ref={field.ref}
                onChange={onChangeInput}
                value={fieldValue}
                label={label}
                description={description}
                error={customErrorFormatter ? customErrorFormatter(getError(errors, name)) : getError(errors, name)}
                placeholder={intl.formatMessage({ id: 'Skjema.input.dato.placeholder' })}
                autoFocus={autofocusWhenEmpty && field.value === undefined}
            />
        </DatePicker>
    );
};
