import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { InputProps } from './types';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/ValiderbartSkjemaelement';

class ValidSelect extends Component<
    ValiderbartSkjemaelementProps & InputProps
> {
    render() {
        const { ...other } = this.props;
        return <ValiderbartSkjemaelement component={Select} {...other} />;
    }
}

export default ValidSelect;
