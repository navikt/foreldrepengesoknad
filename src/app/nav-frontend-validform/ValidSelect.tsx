import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import ValidBase, { ValidBaseProps } from './';
import { InputProps } from './types';

class ValidSelect extends Component<ValidBaseProps & InputProps> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={Select} {...other} />;
    }
}

export default ValidSelect;
