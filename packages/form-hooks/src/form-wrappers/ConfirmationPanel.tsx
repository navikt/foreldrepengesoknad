import { FunctionComponent, ReactNode, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { ConfirmationPanel as DsConfirmationPanel } from '@navikt/ds-react';
import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    validate?: Array<(value: boolean) => any>;
    children: React.ReactElement;
}

const ConfirmationPanel: FunctionComponent<Props> = ({ name, label, validate = [], children }) => {
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
        <DsConfirmationPanel
            ref={field.ref}
            label={label}
            onChange={(evt) => field.onChange(evt)}
            checked={field.value ? field.value : ''}
            error={getError(errors, name)}
        >
            {children}
        </DsConfirmationPanel>
    );
};

export default ConfirmationPanel;
