import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import './personaliaBox.less';

export interface Personalia {
    fnr: string;
    navn: string;
    alder: number;
}

interface PersonaliaBoxProps {
    personalia: Personalia;
}

const PersonaliaBox = (props: PersonaliaBoxProps) => {
    if (!props.personalia) {
        return null;
    }
    return (
        <div className="personaliaBox">
            <Normaltekst className="personaliaBox__fnr">
                {props.personalia.fnr}
            </Normaltekst>
            <Normaltekst className="personaliaBox__alder">
                {props.personalia.alder}
            </Normaltekst>
            <Element className="personaliaBox__navn">
                {props.personalia.navn}
            </Element>
        </div>
    );
};

export default PersonaliaBox;
