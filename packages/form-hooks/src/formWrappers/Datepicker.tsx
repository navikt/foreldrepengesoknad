import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { FunctionComponent, ReactNode, useCallback, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT, TIDENES_ENDE, TIDENES_MORGEN } from '@navikt/fp-constants';

import { getError, getValidationRules } from './formUtils';

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

export interface Props {
    name: string;
    label?: string | ReactNode;
    description?: string;
    validate?: Array<(value: string) => any>;
    onChange?: (value: any) => void;
    minDate?: Date | Dayjs | string;
    maxDate?: Date | Dayjs | string;
    defaultMonth?: Date | Dayjs | string;
    showMonthAndYearDropdowns?: boolean;
    disableWeekends?: boolean;
    autofocusWhenEmpty?: boolean;
    customErrorFormatter?: (error: string | undefined) => ReactNode;
    useStrategyAbsolute?: boolean;
}

const Datepicker: FunctionComponent<Props> = ({
    name,
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
}): JSX.Element => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
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
            const verdi = dayjs(event.target.value, DDMMYYYY_DATE_FORMAT, true).format(ISO_DATE_FORMAT);
            const isValidDate = isValidDateString(verdi);

            setFieldValue(event.target.value);
            if (onChange) {
                onChange(isValidDate ? verdi : event.target.value);
            }
            field.onChange(isValidDate ? verdi : event.target.value);
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
        >
            <DatePicker.Input
                {...inputProps}
                ref={field.ref}
                onChange={onChangeInput}
                value={fieldValue}
                label={label}
                description={description}
                error={customErrorFormatter ? customErrorFormatter(getError(errors, name)) : getError(errors, name)}
                placeholder="dd.mm.åååå"
                autoFocus={autofocusWhenEmpty && field.value === undefined}
            />
        </DatePicker>
    );
};

export default Datepicker;
