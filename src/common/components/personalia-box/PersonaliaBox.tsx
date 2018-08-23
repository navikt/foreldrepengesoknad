import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import './personaliaBox.less';
import { PersonBase } from 'app/types/Person';
import { getAlderFraDato } from 'app/util/dates/dates';
import { formaterNavn } from 'app/util/domain/personUtil';

interface PersonaliaBoxProps {
    person: PersonBase;
}

const PersonaliaBox = ({ person }: PersonaliaBoxProps) => {
    return (
        <div className="personaliaBox">
            <Normaltekst className="personaliaBox__fnr">
                {person.fnr}
            </Normaltekst>
            <Normaltekst className="personaliaBox__alder">
                {getAlderFraDato(person.fødselsdato).år}
            </Normaltekst>
            <Element className="personaliaBox__navn">
                {formaterNavn(person.fornavn, person.etternavn, person.fornavn)}
            </Element>
        </div>
    );
};

export default PersonaliaBox;
