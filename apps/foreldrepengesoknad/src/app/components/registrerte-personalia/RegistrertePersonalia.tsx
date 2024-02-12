import * as React from 'react';

import { FormattedMessage } from 'react-intl';
import { bemUtils, formaterNavn } from '@navikt/fp-common';
import { BodyShort, Label } from '@navikt/ds-react';

import './registrertePersonalia.less';
import { SøkerAnnenForelder, SøkerBarn } from '@navikt/fp-types';

interface Props {
    person: SøkerAnnenForelder | SøkerBarn;
    visEtternavn: boolean;
    fødselsnummerForVisning?: string;
    fødselsdatoForVisning?: string;
    altTekstHvisUkjentNavn?: string;
}

const RegistrertePersonalia: React.FunctionComponent<Props> = ({
    person,
    fødselsnummerForVisning,
    fødselsdatoForVisning,
    altTekstHvisUkjentNavn,
    visEtternavn,
}: Props) => {
    const bem = bemUtils('registrertePersonalia');
    return (
        <div className={bem.block}>
            <Label className={bem.element('navn')}>
                {altTekstHvisUkjentNavn !== undefined
                    ? altTekstHvisUkjentNavn
                    : formaterNavn(person.fornavn, person.etternavn, visEtternavn, person.mellomnavn)}
            </Label>
            {fødselsnummerForVisning !== undefined && (
                <BodyShort>
                    <FormattedMessage
                        id="registrertePersonalia.fødselsnummer"
                        values={{ fnr: fødselsnummerForVisning }}
                    />
                </BodyShort>
            )}
            {!altTekstHvisUkjentNavn && fødselsdatoForVisning !== undefined && (
                <BodyShort>
                    <FormattedMessage
                        id="registrertePersonalia.fødselsdato"
                        values={{ fødselsdato: fødselsdatoForVisning }}
                    />
                </BodyShort>
            )}
        </div>
    );
};

export default RegistrertePersonalia;
