import { ReactNode } from 'react';
import { FieldValues, UseControllerProps, useController, useFormContext } from 'react-hook-form';

import { ConfirmationPanel } from '@navikt/ds-react';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

type Props<T extends FieldValues> = {
    label: string | ReactNode;
    validate?: Array<(value: boolean) => ValidationReturnType>;
    children: React.ReactElement;
    control: UseControllerProps<T>['control'];
} & Omit<UseControllerProps<T>, 'control'>;

export const RhfConfirmationPanel = <T extends FieldValues>({
    label,
    validate = [],
    children,
    ...controllerProps
}: Props<T>) => {
    const { name, control } = controllerProps;

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

    return (
        <ConfirmationPanel
            ref={field.ref}
            label={label}
            onChange={(evt) => field.onChange(evt)}
            // @ts-expect-error Fiksar ikkje denne da heile komponenten er depricated og bør byttast ut
            checked={field.value ?? ''}
            error={getError(errors, name)}
        >
            {children}
        </ConfirmationPanel>
    );
};
