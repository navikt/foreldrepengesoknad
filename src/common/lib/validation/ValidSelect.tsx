import React, { Component } from 'react';
import { Select } from 'nav-frontend-skjema';
import { InputProps } from './types';
import {
    default as ValidBase,
    ValidBaseProps
} from 'common/lib/validation/index';

class ValidSelect extends Component<ValidBaseProps & InputProps> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={Select} {...other} />;
    }
}

export default ValidSelect;
