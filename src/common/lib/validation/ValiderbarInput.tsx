import React from 'react';
import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/ValiderbartSkjemaelement';

export type ValiderbarInputProps = ValiderbartSkjemaelementProps &
    NavFrontendInputProps;

const ValiderbarInput: React.StatelessComponent<ValiderbarInputProps> = (
    props: ValiderbarInputProps
) => {
    return <ValiderbartSkjemaelement component={Input} {...props} />;
};

export default ValiderbarInput;
