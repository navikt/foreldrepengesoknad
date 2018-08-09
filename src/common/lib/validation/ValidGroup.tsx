import React, { Component } from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import {
    default as ValiderbartSkjemaelement,
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/ValiderbartSkjemaelement';

class ValidGroup extends Component<ValiderbartSkjemaelementProps> {
    render() {
        const { ...other } = this.props;
        return <ValiderbartSkjemaelement component={SkjemaGruppe} {...other} />;
    }
}

export default ValidGroup;
