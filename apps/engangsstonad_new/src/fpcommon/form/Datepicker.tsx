import React, { useState, FunctionComponent, ReactNode, useMemo, useCallback } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Matcher } from 'react-day-picker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { DatePicker, useDatepicker } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

dayjs.extend(customParseFormat);

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';
export const DDMMYYYY_DATE_FORMAT = 'DD.MM.YYYY';

export interface DatepickerProps {
    name: string;
    label?: string | ReactNode;
    description?: string;
    validate?: ((value: string) => any)[];
    onChange?: (value: any) => void;
    disabledDays?: Matcher[];
    defaultMonth?: Date;
}

const Datepicker: FunctionComponent<DatepickerProps> = ({
    name,
    label,
    description,
    validate = [],
    onChange,
    disabledDays,
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

    const dpProps = {
        ...datepickerProps,
        disabled: disabledDays,
    };

    return (
        <DatePicker {...dpProps} strategy="fixed">
            <DatePicker.Input
                {...inputProps}
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
