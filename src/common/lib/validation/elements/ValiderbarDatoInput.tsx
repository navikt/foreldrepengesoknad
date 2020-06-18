import React from 'react';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps,
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';
import DatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';

type Props = ValiderbartSkjemaelementProps & DatoInputProps;

const ValiderbarDatoInput: React.StatelessComponent<Props> = (props) => {
    const { validators, optional, validateOnBlur, validateOnChange, ...rest } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            render={(onChange, _onBlur, feil) => <DatoInput {...rest} onChange={onChange} feil={feil} />}
        />
    );
};

export default ValiderbarDatoInput;
