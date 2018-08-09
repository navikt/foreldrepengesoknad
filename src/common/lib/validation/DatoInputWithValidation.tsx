import React, { Component } from 'react';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/ValiderbartSkjemaelement';
import DatoInput, {
    DatoInputProps
} from 'common/components/dato-input/DatoInput';

class DatoInputWithValidation extends Component<
    ValiderbartSkjemaelementProps & DatoInputProps
> {
    render() {
        const { ...other } = this.props;
        return <ValiderbartSkjemaelement component={DatoInput} {...other} />;
    }
}

export default DatoInputWithValidation;
