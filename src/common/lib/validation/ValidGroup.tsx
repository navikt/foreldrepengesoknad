import React, { Component } from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import {
    default as ValidBase,
    ValidBaseProps
} from 'common/lib/validation/index';

class ValidGroup extends Component<ValidBaseProps> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={SkjemaGruppe} {...other} />;
    }
}

export default ValidGroup;
