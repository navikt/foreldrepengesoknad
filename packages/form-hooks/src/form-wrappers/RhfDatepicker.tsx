import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { ComponentProps, JSX, ReactNode, useCallback, useMemo, useState } from 'react';
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

const formatDateInput = (value: string): string => {
    // Håndter 8-sifret format: "22102022" → "22.10.2022"
    if (/^\d{8}$/.test(value)) {
        return `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 8)}`;
    }

    // Håndter 6-sifret format hvis man bare vil skrive inn to desimaler for året: "221019" → "22.10.2019"
    if (/^\d{6}$/.test(value)) {
        const twoDigitYear = value.slice(4, 6);
        // Hopp over hvis året starter med "20" (sannsynligvis 4-sifret år)
        if (twoDigitYear !== '20') {
            const fullYear = parseInt(twoDigitYear, 10) < 50 ? `20${twoDigitYear}` : `19${twoDigitYear}`;
            return `${value.slice(0, 2)}.${value.slice(2, 4)}.${fullYear}`;
        }
    }

    return value;
};

type Props<T extends FieldValues> = {
    label?: string | ReactNode;
    description?: string;
    validate?: Array<(value: string) => ValidationReturnType>;
    onChange?: (value: string) => void;
    onSelect?: (val?: ComponentProps<typeof DatePicker>['selected']) => void;
    onBlur?: () => void;
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
    onSelect,
    onBlur,
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
            validate: useMemo(() => getValidationRules(validate), [validate]),
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

    const onChangeInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = formatDateInput(event.target.value);
            const verdi = dayjs(inputValue, DDMMYYYY_DATE_FORMAT, true).format(ISO_DATE_FORMAT);
            const isValidDate = isValidDateString(verdi);

            setFieldValue(inputValue);
            if (onChange) {
                onChange(isValidDate ? verdi : inputValue);
            }
            field.onChange(isValidDate ? verdi : inputValue);
        },
        [setFieldValue, onChange, field],
    );

    const fromDate = minDate ? dayjs(minDate).toDate() : undefined;
    const toDate = maxDate ? dayjs(maxDate).toDate() : undefined;
    const disabledDays = useMemo(
        () => (fromDate || toDate ? findDisabledDays(fromDate, toDate) : undefined),
        [fromDate, toDate],
    );

    return (
        <DatePicker
            {...datepickerProps}
            disabled={disabledDays}
            strategy={useStrategyAbsolute ? 'absolute' : 'fixed'}
            dropdownCaption={showMonthAndYearDropdowns}
            fromDate={fromDate}
            toDate={toDate}
            disableWeekends={disableWeekends}
            onSelect={onSelect}
            onBlur={onBlur}
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
