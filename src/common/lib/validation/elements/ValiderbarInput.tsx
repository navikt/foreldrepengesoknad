import React from 'react';
import { Input, InputProps } from 'nav-frontend-skjema';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export type ValiderbarInputProps = ValiderbartSkjemaelementProps & InputProps;

const ValiderbarInput: React.StatelessComponent<ValiderbarInputProps> = (props: ValiderbarInputProps) => {
    const { validators, optional, validateOnBlur, validateOnChange, ...inputProps } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            render={(onChange, onBlur, feil) => (
                <Input {...inputProps} onChange={onChange} onBlur={onBlur} feil={feil} />
            )}
        />
    );
};

export default ValiderbarInput;
