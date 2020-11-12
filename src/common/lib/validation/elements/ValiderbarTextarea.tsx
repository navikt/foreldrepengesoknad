import React from 'react';
import { TextareaProps } from 'nav-frontend-skjema';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps,
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';
import Textarea from 'nav-frontend-skjema/lib/textarea';

export type ValiderbarTextareaProps = ValiderbartSkjemaelementProps & TextareaProps;

const ValiderbarTextarea: React.FunctionComponent<ValiderbarTextareaProps> = (props: ValiderbarTextareaProps) => {
    const { validators, optional, validateOnBlur, validateOnChange, ...inputProps } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            render={(onChange, onBlur, feil) => (
                <Textarea
                    {...inputProps}
                    onChange={onChange}
                    onBlur={onBlur}
                    feil={feil !== undefined ? feil.feilmelding : undefined}
                />
            )}
        />
    );
};

export default ValiderbarTextarea;
