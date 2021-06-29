import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { RegistrertAnnenForelder } from 'app/types/Person';
import { FormattedMessage } from 'react-intl';
import { formaterNavn } from 'app/utils/personUtils';
import { getAlderFraDato } from 'app/utils/dateUtils';
import './registrertePersonalia.less';
import { bemUtils } from '@navikt/fp-common';

interface Props {
    person: RegistrertAnnenForelder;
}

const RegistrertePersonalia: React.FunctionComponent<Props> = ({ person }: Props) => {
    const bem = bemUtils('registrertePersonalia');

    return (
        <div className={bem.block}>
            <Element className={bem.element('navn')}>
                {formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
            </Element>
            <Normaltekst>
                <FormattedMessage
                    id="annenForelder.registrertePersonalia.fødselsnummerOgÅr"
                    values={{ fnr: person.fnr, år: getAlderFraDato(person.fødselsdato).år }}
                />
            </Normaltekst>
        </div>
    );
};

export default RegistrertePersonalia;
