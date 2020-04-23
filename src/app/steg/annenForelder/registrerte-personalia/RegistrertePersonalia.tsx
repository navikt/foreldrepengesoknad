import * as React from 'react';
import { EtikettLiten, Element } from 'nav-frontend-typografi';

import { RegistrertAnnenForelder } from 'app/types/Person';
import { getAlderFraDato } from 'app/util/dates/dates';
import { formaterNavn } from 'app/util/domain/personUtil';
import { FormattedMessage } from 'react-intl';
import './registrertePersonalia.less';

interface PersonaliaBoxProps {
    person: RegistrertAnnenForelder;
}

type Props = PersonaliaBoxProps;
const PersonaliaBox: React.StatelessComponent<Props> = ({ person }: Props) => {
    return (
        <div className="personaliaBox">
            <EtikettLiten className="personaliaBox__fnr">{person.fnr}</EtikettLiten>
            <EtikettLiten className="personaliaBox__alder">
                <FormattedMessage id="personalia.år" values={{ år: getAlderFraDato(person.fødselsdato).år }} />
            </EtikettLiten>
            <Element className="personaliaBox__navn">
                {formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
            </Element>
        </div>
    );
};

export default PersonaliaBox;
