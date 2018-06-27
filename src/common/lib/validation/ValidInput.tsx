import React, { Component } from 'react';
import { Input } from 'nav-frontend-skjema';
import { InputProps } from './types';
import {
    default as ValidBase,
    ValidBaseProps
} from 'common/lib/validation/index';

class ValidInput extends Component<ValidBaseProps & InputProps> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={Input} {...other} />;
    }
}

export default ValidInput;
