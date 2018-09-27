import React from 'react';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { ValiderbartSkjemaelementProps } from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export type ValiderbarSelectProps = ValiderbartSkjemaelementProps & SelectProps;

const ValiderbarSelect: React.StatelessComponent<ValiderbarSelectProps> = (props: ValiderbarSelectProps) => {
    const { validators, optional, validateOnBlur, validateOnChange, ...rest } = props;
    return <Select {...rest} />;
};

export default ValiderbarSelect;
