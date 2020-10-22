import React from 'react';
import DatoInput, { DatoInputProps } from 'common/components/skjema/elements/dato-input/DatoInput';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps,
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';

type Props = Omit<ValiderbartSkjemaelementProps, 'onChange'> & DatoInputProps;

const ValiderbarDatoInput = (props: Props) => {
    const { validators, optional, validateOnBlur, validateOnChange, onChange, ...rest } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            onChange={onChange}
            render={(renderOnChange, _onBlur, feil) => <DatoInput {...rest} onChange={renderOnChange} feil={feil} />}
        />
    );
};

export default ValiderbarDatoInput;
