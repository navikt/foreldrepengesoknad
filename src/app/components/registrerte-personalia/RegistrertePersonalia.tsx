import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { RegistrertAnnenForelder, RegistrertBarn } from 'app/types/Person';
import { FormattedMessage } from 'react-intl';
import { formaterNavn } from 'app/utils/personUtils';
import { getAlderFraDato } from 'app/utils/dateUtils';
import './registrertePersonalia.less';
import { bemUtils, formatDate } from '@navikt/fp-common';

interface Props {
    person: RegistrertAnnenForelder | RegistrertBarn;
    visFødselsnummer: boolean;
}

const RegistrertePersonalia: React.FunctionComponent<Props> = ({ person, visFødselsnummer }: Props) => {
    const bem = bemUtils('registrertePersonalia');

    return (
        <div className={bem.block}>
            <Element className={bem.element('navn')}>
                {formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
            </Element>
            {visFødselsnummer && (
                <Normaltekst>
                    <FormattedMessage
                        id="annenForelder.registrertePersonalia.fødselsnummerOgÅr"
                        values={{ fnr: person.fnr, år: getAlderFraDato(person.fødselsdato).år }}
                    />
                </Normaltekst>
            )}
            {!visFødselsnummer && (
                <Normaltekst>
                    <FormattedMessage
                        id="omBarnet.registrertePersonalia.fødselOgÅr"
                        values={{ fødselsdato: formatDate(person.fødselsdato) }}
                    />
                </Normaltekst>
            )}
        </div>
    );
};

export default RegistrertePersonalia;
