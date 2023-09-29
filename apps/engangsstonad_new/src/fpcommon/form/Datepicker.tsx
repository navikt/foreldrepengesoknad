import React, { useState, FunctionComponent, ReactNode, useMemo, useCallback } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

dayjs.extend(customParseFormat);

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const DDMMYYYY_DATE_FORMAT = 'DD.MM.YYYY';

const TIDENES_MORGEN = dayjs('1000-01-01').toDate();
const TIDENES_ENDE = dayjs('9999-31-12').toDate();

const findDisabledDays = (minDate?: Date, maxDate?: Date): { from: Date; to?: Date }[] => {
    const disabledDays = [];
    if (minDate) {
        disabledDays.push({
            from: dayjs(TIDENES_MORGEN).toDate(),
            to: dayjs(minDate).toDate(),
        });
    }
    if (maxDate) {
        disabledDays.push({
            from: dayjs(maxDate).toDate(),
            to: dayjs(TIDENES_ENDE).toDate(),
        });
    }
    return disabledDays;
};

export interface DatepickerProps {
    name: string;
    label?: string | ReactNode;
    description?: string;
    validate?: ((value: string) => any)[];
    onChange?: (value: any) => void;
    minDate?: Date;
    maxDate?: Date;
    defaultMonth?: Date;
}

const Datepicker: FunctionComponent<DatepickerProps> = ({
    name,
    label,
    description,
    validate = [],
    onChange,
    minDate,
    maxDate,
    defaultMonth,
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
    const [fieldValue, setFieldValue] = useState<string>(defaultDate);

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
        defaultSelected: field.value ? dayjs(field.value, ISO_DATE_FORMAT, true).toDate() : undefined,
        defaultMonth: defaultMonth,
    });

    const onChangeInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const verdi = dayjs(event.target.value, DDMMYYYY_DATE_FORMAT, true).format(ISO_DATE_FORMAT);
            const validDate = verdi !== 'Invalid Date';

            setFieldValue(event.target.value);
            if (onChange) {
                onChange(validDate ? verdi : event.target.value);
            }
            field.onChange(validDate ? verdi : event.target.value);
        },
        [setFieldValue, onChange, field],
    );

    const disabledDays = useMemo(
        () => (minDate || maxDate ? findDisabledDays(minDate, maxDate) : undefined),
        [minDate, maxDate],
    );

    return (
        <DatePicker {...datepickerProps} disabled={disabledDays} strategy="fixed">
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
