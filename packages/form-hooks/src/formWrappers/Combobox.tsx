import { FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { getError, getValidationRules } from './formUtils';

export interface Props {
    name: string;
    label: string | ReactNode;
    validate?: Array<(value: string) => any>;
    options: string[];
    description?: ReactNode;
    disabled?: boolean;
    className?: string;
}

const Combobox: FunctionComponent<Props> = ({
    name,
    label,
    validate = [],
    description,
    disabled,
    className,
    options,
}) => {
    const {
        formState: { errors },
    } = useFormContext();

    const { field } = useController({
        name,
        rules: {
            validate: useMemo(() => getValidationRules(validate), [validate]),
        },
    });

    const onToggleSelected = useCallback(
        (option: string, isSelected: boolean, isCustomOption: boolean) => {
            if (!isCustomOption) {
                field.onChange(isSelected ? option : '');
            }
        },
        [field],
    );

    return (
        <UNSAFE_Combobox
            ref={field.ref}
            label={label}
            selectedOptions={[field.value]}
            description={description}
            className={className}
            onToggleSelected={onToggleSelected}
            error={getError(errors, name)}
            disabled={disabled}
            options={options}
            clearButton={false}
        />
    );
};

export default Combobox;
