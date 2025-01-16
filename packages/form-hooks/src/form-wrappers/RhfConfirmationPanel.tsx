import { ReactNode, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { ConfirmationPanel } from '@navikt/ds-react';

import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    validate?: Array<(value: boolean) => any>;
    children: React.ReactElement;
}

export const RhfConfirmationPanel = ({ name, label, validate = [], children }: Props) => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    return (
        <ConfirmationPanel
            ref={field.ref}
            label={label}
            onChange={(evt) => field.onChange(evt)}
            checked={field.value ? field.value : ''}
            error={getError(errors, name)}
        >
            {children}
        </ConfirmationPanel>
    );
};
