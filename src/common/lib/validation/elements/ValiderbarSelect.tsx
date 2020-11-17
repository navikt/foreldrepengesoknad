import React from 'react';
import { Select, SelectProps } from 'nav-frontend-skjema';
import ValiderbartSkjemaelement, {
    ValiderbartSkjemaelementProps,
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export type ValiderbarSelectProps = ValiderbartSkjemaelementProps & SelectProps;

const ValiderbarSelect: React.FunctionComponent<ValiderbarSelectProps> = (props: ValiderbarSelectProps) => {
    const { validators, optional, validateOnBlur, validateOnChange, ...rest } = props;
    return (
        <ValiderbartSkjemaelement
            {...props}
            render={(onChange, onBlur, feil) => (
                <Select
                    {...rest}
                    autoComplete="off"
                    onChange={onChange}
                    onBlur={onBlur}
                    feil={feil !== undefined ? feil.feilmelding : undefined}
                />
            )}
        />
    );
};

export default ValiderbarSelect;
