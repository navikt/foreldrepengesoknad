import React from 'react';
import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/ValiderbartSkjemaelement';

export type ValiderbartSkjemaelementProps = ValiderbartSkjemaelementProps &
    NavFrontendInputProps;

const ValiderbarInput: React.StatelessComponent<
    ValiderbartSkjemaelementProps
> = (props: ValiderbartSkjemaelementProps) => {
    return <ValiderbartSkjemaelement component={Input} {...props} />;
};

export default ValiderbarInput;
