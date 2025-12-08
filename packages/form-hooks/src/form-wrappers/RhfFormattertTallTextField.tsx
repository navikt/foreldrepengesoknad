import { useMemo } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext, useWatch } from 'react-hook-form';

import { TextFieldProps as DsTextFieldProps, TextField } from '@navikt/ds-react';

import { ValidationReturnType, getValidationRules } from './formUtils.ts';

type Props<T extends FieldValues> = {
    validate?: Array<(value: string) => ValidationReturnType>;
    control: UseControllerProps<T>['control'];
} & DsTextFieldProps &
    Omit<UseControllerProps<T>, 'control'>;

/** Et tekstfelt som formaterer innholdet til et tall med tusenvise mellomrom. */
export const RhfFormattertTallTextField = <T extends FieldValues>({
    name,
    min,
    max,
    required,
    validate = [],
    ...rest
}: Props<T>) => {
    const { control } = useFormContext();
    const { field, fieldState } = useController({
        name,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    // NOTE: jeg forstår ikke helt hvorfor vi ikke kan bruke field.value som value til input.
    // Det fungerer i de fleste caser. Men ikke når verdien oppdateres et annet sted med setValue(). useWatch fungerer derimot som ønsket
    const watchedValue = useWatch({
        control,
        name,
    });

    return (
        <TextField
            {...rest}
            aria-label={field.value}
            autoComplete="off"
            error={fieldState.error?.message}
            onChange={(e) => {
                const value = e.target.value;
                const formattertTall = formatTall(value);
                // Remove spaces from the input value
                const tallUtenMellomrom = formattertTall.replaceAll(/\s+/g, '');
                field.onChange(tallUtenMellomrom);
            }}
            ref={field.ref}
            value={formatTall(watchedValue)}
        />
    );
};

/** Formatterer en inputverdi til et tall med tusenvise mellomrom.
 *
 * Om det ikke er et tall, returneres inputverdien.
 */
const formatTall = (value: string | undefined) => {
    if (value === '' || value === undefined) {
        return '';
    }

    const cleanValue = value.toString().replaceAll(/\s+/g, '');
    const hasTrailingComma = cleanValue.includes(',');

    // Parse to number
    const numberValue = formatStrengTilTall(cleanValue);

    if (Number.isNaN(numberValue)) {
        return value;
    }
    const formattedValue = new Intl.NumberFormat('nb-NO', {
        maximumFractionDigits: 2,
    }).format(numberValue);

    const formattedValueHasComma = formattedValue.includes(',');
    const shouldApplyTrailingComma = !formattedValueHasComma && hasTrailingComma;

    return shouldApplyTrailingComma ? `${formattedValue},` : formattedValue;
};

const formatStrengTilTall = (tall: string | number) => {
    // Norske desimaltall bruker komma, mens Number() krever punktum.
    const tallMedPunktumDesimaltegn = tall.toString().replace(',', '.');
    const tallMedRiktigMinusTegn = tallMedPunktumDesimaltegn.replace('−', '-');
    return Number(tallMedRiktigMinusTegn);
};
