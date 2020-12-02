import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { RegistrertAnnenForelder } from 'app/types/Person';
import { getAlderFraDato } from 'app/util/dates/dates';
import { formaterNavn } from 'app/util/domain/personUtil';
import { FormattedMessage } from 'react-intl';
import './registrertePersonalia.less';

interface PersonaliaBoxProps {
    person: RegistrertAnnenForelder;
}

type Props = PersonaliaBoxProps;
const PersonaliaBox: React.FunctionComponent<Props> = ({ person }: Props) => {
    return (
        <div className="personaliaBox">
            <Element className="personaliaBox__navn">
                {formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
            </Element>
            <Normaltekst>
                <FormattedMessage
                    id="personalia.fødselsnummerOgÅr"
                    values={{ fnr: person.fnr, år: getAlderFraDato(person.fødselsdato).år }}
                />
            </Normaltekst>
        </div>
    );
};

export default PersonaliaBox;
