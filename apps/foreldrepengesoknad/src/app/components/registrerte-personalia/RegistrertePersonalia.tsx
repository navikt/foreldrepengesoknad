import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { RegistrertAnnenForelder, RegistrertBarn } from 'app/types/Person';
import { FormattedMessage } from 'react-intl';
import { formaterNavn } from 'app/utils/personUtils';
import './registrertePersonalia.less';
import { bemUtils } from '@navikt/fp-common';

interface Props {
    person: RegistrertAnnenForelder | RegistrertBarn;
    fødselsnummerForVisning?: string;
    fødselsdatoForVisning?: string;
    altTekstHvisUkjentNavn?: string;
}

const RegistrertePersonalia: React.FunctionComponent<Props> = ({
    person,
    fødselsnummerForVisning,
    fødselsdatoForVisning,
    altTekstHvisUkjentNavn,
}: Props) => {
    const bem = bemUtils('registrertePersonalia');
    return (
        <div className={bem.block}>
            <Element className={bem.element('navn')}>
                {altTekstHvisUkjentNavn !== undefined
                    ? altTekstHvisUkjentNavn
                    : formaterNavn(person.fornavn, person.etternavn, person.mellomnavn)}
            </Element>
            {fødselsnummerForVisning !== undefined && (
                <Normaltekst>
                    <FormattedMessage
                        id="registrertePersonalia.fødselsnummer"
                        values={{ fnr: fødselsnummerForVisning }}
                    />
                </Normaltekst>
            )}
            {fødselsdatoForVisning !== undefined && (
                <Normaltekst>
                    <FormattedMessage
                        id="registrertePersonalia.fødselsdato"
                        values={{ fødselsdato: fødselsdatoForVisning }}
                    />
                </Normaltekst>
            )}
        </div>
    );
};

export default RegistrertePersonalia;
