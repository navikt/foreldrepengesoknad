import React, { useState, FunctionComponent, ReactNode, useMemo, useCallback } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { TIDENES_MORGEN, TIDENES_ENDE, ISO_DATE_FORMAT, DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

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
    minDate?: Date;
    maxDate?: Date;
    defaultMonth?: Date;
    showMonthAndYearDropdowns?: boolean;
    disableWeekends?: boolean;
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
        defaultMonth: defaultMonth,
        openOnFocus: false,
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

    const disabledDays = useMemo(
        () => (minDate || maxDate ? findDisabledDays(minDate, maxDate) : undefined),
        [minDate, maxDate],
    );

    return (
        <DatePicker
            {...datepickerProps}
            disabled={disabledDays}
            strategy="fixed"
            dropdownCaption={showMonthAndYearDropdowns}
            fromDate={minDate}
            toDate={maxDate}
            disableWeekends={disableWeekends}
        >
            <DatePicker.Input
                {...inputProps}
                ref={field.ref}
                onChange={onChangeInput}
                value={fieldValue}
                label={label}
                description={description}
                error={getError(errors, name)}
                placeholder="dd.mm.åååå"
            />
        </DatePicker>
    );
};

export default Datepicker;
