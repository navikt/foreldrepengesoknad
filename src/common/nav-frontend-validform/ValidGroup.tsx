import React, { Component } from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import ValidBase, { ValidBaseProps } from './';

class ValidGroup extends Component<ValidBaseProps> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={SkjemaGruppe} {...other} />;
    }
}

export default ValidGroup;
