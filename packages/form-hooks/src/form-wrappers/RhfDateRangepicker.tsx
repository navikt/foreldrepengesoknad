import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { JSX, ReactNode, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { DatePicker, HStack, VStack, useRangeDatepicker } from '@navikt/ds-react';

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

const getDefaultSelected = (fieldValue: string, defaultDate: string) =>
    fieldValue && isValidDateString(defaultDate) ? dayjs(fieldValue, ISO_DATE_FORMAT, true).toDate() : undefined;

const onFieldChange = (value: string, onChange: (...event: string[]) => void) => {
    const verdi = dayjs(value, DDMMYYYY_DATE_FORMAT, true).format(ISO_DATE_FORMAT);
    const isValidDate = isValidDateString(verdi);
    onChange(isValidDate ? verdi : value);
};

interface Props {
    nameFrom: string;
    nameTo: string;
    labelFrom?: string | ReactNode;
    labelTo?: string | ReactNode;
    validateFrom?: Array<(value: string) => ValidationReturnType>;
    validateTo?: Array<(value: string) => ValidationReturnType>;
    minDate?: Date | Dayjs | string;
    maxDate?: Date | Dayjs | string;
    defaultMonth?: Date | Dayjs | string;
    disableWeekends?: boolean;
    useStrategyAbsolute?: boolean;
}

export const RhfDateRangepicker = ({
    nameFrom,
    nameTo,
    labelFrom,
    labelTo,
    validateFrom = [],
    validateTo = [],
    minDate,
    maxDate,
    defaultMonth,
    disableWeekends,
    useStrategyAbsolute = false,
}: Props): JSX.Element => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field: fromField } = useController({
        name: nameFrom,
        rules: {
            validate: useMemo(() => getValidationRules(validateFrom), [validateFrom]),
        },
    });

    const { field: toField } = useController({
        name: nameTo,
        rules: {
            validate: useMemo(() => getValidationRules(validateTo), [validateTo]),
        },
    });

    const fromDefaultDate = fromField.value
        ? dayjs(fromField.value, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT)
        : '';
    const [fromFieldValue, setFromFieldValue] = useState<string>(
        isValidDateString(fromDefaultDate) ? fromDefaultDate : '',
    );

    const toDefaultDate = toField.value ? dayjs(toField.value, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT) : '';
    const [toFieldValue, setToFieldValue] = useState<string>(isValidDateString(toDefaultDate) ? toDefaultDate : '');

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
        onRangeChange: (range) => {
            if (range?.from !== undefined) {
                const fromValue = dayjs(range.from).format(ISO_DATE_FORMAT);
                fromField.onChange(fromValue);
                setFromFieldValue(dayjs(fromValue, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT));
            }
            if (range?.to !== undefined) {
                const toValue = dayjs(range.to).format(ISO_DATE_FORMAT);
                toField.onChange(toValue);
                setToFieldValue(dayjs(toValue, ISO_DATE_FORMAT, true).format(DDMMYYYY_DATE_FORMAT));
            }
        },
        defaultSelected: {
            from: getDefaultSelected(fromField.value, fromDefaultDate),
            to: getDefaultSelected(toField.value, toDefaultDate),
        },
        defaultMonth: defaultMonth ? dayjs(defaultMonth).toDate() : undefined,
    });

    const onChangeFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromFieldValue(event.target.value);
        onFieldChange(event.target.value, fromField.onChange);
    };

    const onChangeToInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToFieldValue(event.target.value);
        onFieldChange(event.target.value, toField.onChange);
    };

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
            fromDate={fromDate}
            toDate={toDate}
            disableWeekends={disableWeekends}
        >
            <VStack gap="space-8">
                <HStack wrap={false} gap="space-16" align="start">
                    <DatePicker.Input
                        {...fromInputProps}
                        ref={fromField.ref}
                        value={fromFieldValue}
                        onChange={onChangeFromInput}
                        label={labelFrom}
                        error={getError(errors, nameFrom)}
                        placeholder="dd.mm.åååå"
                    />
                    <DatePicker.Input
                        {...toInputProps}
                        ref={toField.ref}
                        value={toFieldValue}
                        onChange={onChangeToInput}
                        label={labelTo}
                        error={getError(errors, nameTo)}
                        placeholder="dd.mm.åååå"
                    />
                </HStack>
            </VStack>
        </DatePicker>
    );
};
