import React, { Component } from 'react';
import { Input } from 'nav-frontend-skjema';
import ValidBase, { ValidBaseProps } from './';
import { InputProps } from './types';

class ValidInput extends Component<ValidBaseProps & InputProps> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={Input} {...other} />;
    }
}

export default ValidInput;
