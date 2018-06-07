import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import './personaliaBox.less';

interface PersonaliaBoxProps {
    personalia: any;
}

const PersonaliaBox = (props: PersonaliaBoxProps) => {
    return (
        <div className="personaliaBox">
            <Normaltekst>{props.personalia.fnr}</Normaltekst>
            <Normaltekst>{props.personalia.alder}</Normaltekst>
            <Element>{props.personalia.fornavn}</Element>
        </div>
    );
};

export default PersonaliaBox;
