import React from 'react';
import { Select, SelectProps } from 'nav-frontend-skjema';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export type ValiderbarSelectProps = ValiderbartSkjemaelementProps & SelectProps;

const ValiderbarSelect: React.StatelessComponent<ValiderbarSelectProps> = (props: ValiderbarSelectProps) => {
    return <ValiderbartSkjemaelement component={Select} {...props} />;
};

export default ValiderbarSelect;
