import React, { Component } from 'react';
import {
    default as ValidBase,
    ValidBaseProps
} from 'common/lib/validation/index';
import DatoInput, {
    DatoInputProps
} from 'common/components/dato-input/DatoInput';

class DatoInputWithValidation extends Component<
    ValidBaseProps & DatoInputProps
> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={DatoInput} {...other} />;
    }
}

export default DatoInputWithValidation;
